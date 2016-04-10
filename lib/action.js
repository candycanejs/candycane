"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let Action = class Action {

  constructor(app) {
    this.app = app;
  }

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */

  /**
   * Express Request Object
   */
  data() {}

  /**
   * User defined action handler
   * Promise aware
   */
  handle() {
    return this.data();
  }

  createMiddleware() {
    return (req, res) => {
      this.request = req;

      const hooks = [this.beforeAll, ...this.beforeHooks, this.before, this.handle, this.after, ...this.afterHooks, this.afterAll];

      const finalResult = hooks.reduce((carry, curr) => {
        return curr ? carry.then(result => curr.call(this, result)) : carry;
      }, Promise.resolve());

      finalResult.then(d => {
        res.send(d);
      }).catch(function () {
        let d = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref = d || 500;

        const status = _ref.status;

        res.status(status).send(d);
      });
    };
  }

  static boot(app) {
    const instance = new this(app);

    return instance.createMiddleware();
  }
};
exports.default = Action;

Action.prototype.beforeHooks = [];
Action.prototype.afterHooks = [];