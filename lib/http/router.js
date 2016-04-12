import express from 'express';

export default class Router {
  constructor(application, namespace) {
    this.application = application;
    this.namespace = namespace;
    this.express = this.application.make(`express`);
  }

  resource(uri, routeGroupName, cb) {
    const childExpressRouter = new express.Router();
    this.express.use(uri, childExpressRouter);

    const childRouter = new Router(this.application, routeGroupName);

    cb(childRouter);
  }

  get(uri, moduleName) {
    this.express.get(uri, this.createActionForModule(moduleName));
  }

  post(uri, moduleName) {
    this.express.post(uri, this.createActionForModule(moduleName));
  }

  put(uri, moduleName) {
    this.express.put(uri, this.createActionForModule(moduleName));
  }

  patch(uri, moduleName) {
    this.express.patch(uri, this.createActionForModule(moduleName));
  }

  delete(uri, moduleName) {
    this.express.delete(uri, this.createActionForModule(moduleName));
  }

  createActionForModule(moduleName) {
    const namespace = this.namespace ? `${this.namespace}/` : '';

    const Action = this.application.make(`action:${namespace}${this.getModuleName(moduleName)}`);

    return Action.boot(this.application);
  }

  getModuleName(moduleName) {
    return moduleName;
  }
}
