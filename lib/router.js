import express from 'express';

export default class Router {
  constructor(express, container, namespace) {
    this.express = express;
    this.container = container;
    this.loader = container.loader;
    this.namespace = namespace;
  }

  resource(uri, routeGroupName, cb) {
    const childExpressRouter = new express.Router();
    this.express.use(uri, childExpressRouter);

    const childRouter = new Router(childExpressRouter, this.container, routeGroupName);

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

  delete(uri, moduleName) {
    this.express.delete(uri, this.createActionForModule(moduleName));
  }

  createActionForModule(moduleName) {
    const namespace = this.namespace ? `${this.namespace}/` : '';

    const Action = this.container.loader.require(`action:${namespace}${this.getModuleName(moduleName)}`);

    return Action.boot(this.container);
  }

  getModuleName(moduleName) {
    return moduleName;
  }
}
