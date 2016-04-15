export default class Action {
  beforeAll;
  before;
  after;
  afterAll;

  /**
   * Express Request Object
   */
  request;

  /**
   * Express Response Object
   */
  response;

  hasSent = false;

  constructor(app) {
    this.app = app;
  }


  /**
   * Sets the status code for the current response object
   */
  setStatus() {
    this.response.status(...arguments);
  }

  /**
   * Sends the arguments using `this.response.send`
   * and breaks the promise chain
   *
   * @param  {mixed} data
   * @return {[type]}      [description]
   */
  send(data) {
    console.log(`Response already sent. Not sending again`);

    if (!this.hasSent) {
      this.hasSent = true;
      return this.response.send(data);
    }
  }

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
  }

  /**
   * User defined action handler
   * Promise aware
   */
  handle() {
    return this.data();
  }

  handleError(d = {}) {
    let status = 500;

    if (d.status && typeof d.status === 'number') {
      status = d.status;
    }
    console.log(d);

    this.setStatus(status);
    this.send({
      message: `There was an error`,
    });
  }

  runHook(lastResult, hook) {
    if (this.hasSent) {
      return null;
    }

    return this::hook(lastResult);
  }

  createMiddleware() {
    return (req, res) => {
      this.hasSent = false;
      this.request = req;
      this.response = res;

      const hooks = [
        this.beforeAll,
        ...this.beforeHooks,
        this.before,
        this.handle,
        this.after,
        ...this.afterHooks,
        this.afterAll,
      ];

      const finalResult = hooks.reduce((carry, curr) => {
        return curr ? carry.then((result) => this.runHook(result, curr)) : carry;
      }, Promise.resolve());

      finalResult.then((result) => {
        this.send(result);
      }).catch((e) => {
        this.handleError(e);
      });
    };
  }

  static boot(app) {
    const instance = new this(app);

    return instance.createMiddleware();
  }
}

Action.prototype.beforeHooks = [];
Action.prototype.afterHooks = [];
