export default class Provider {
  requires = [];

  constructor(app) {
    this.app = app;

    this.requires.forEach((req) => {
      this.app.runProvider(req);
    });
  }
}
