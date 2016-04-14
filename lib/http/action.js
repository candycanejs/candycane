export default class Action {
  beforeAll;
  before;
  after;
  afterAll;

  /**
   * Express Request Object
   */
  request;

  constructor(app) {
    this.app = app;
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

    this.response.status(status).send({
      message: `There was an error`,
    });
  }

  createMiddleware() {
    return (req, res) => {
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
        return curr ? carry.then((result) => this::curr(result)) : carry;
      }, Promise.resolve());

      finalResult.then((d) => {
        res.send(d);
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
