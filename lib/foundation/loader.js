export default class Loader {
  rootPath;

  constructor(rootPath) {
    this.rootPath = rootPath;
    this.registry = {};
  }

  require(fullModuleName) {
    const [namespace, moduleName] = fullModuleName.split(':');

    const module = require(`${this.rootPath}/${namespace}s/${moduleName}`).default;

    this.register(fullModuleName, module);

    return module;
  }

  register(name, instance) {
    this.registry[name] = instance;
  }

  make(moduleName) {
    const existing = this.registry[moduleName];

    return existing ? existing : this.require(moduleName);
  }
}
