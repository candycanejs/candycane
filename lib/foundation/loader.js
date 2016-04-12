import walk from 'walk';

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

  requireNpm(moduleName) {
    const module = require(`${this.rootPath}/../node_modules/${moduleName}`);

    return module;
  }

  register(name, instance) {
    this.registry[name] = instance;
  }

  make(moduleName) {
    const existing = this.registry[moduleName];

    return existing ? existing : this.require(moduleName);
  }

  pathsForNamespace(namespace) {
    const dir = `${this.rootPath}/${namespace}`;

    walkSync(dir, {
      listeners: {
        names(root, nodeNamesArray) {
          console.log(root, nodeNamesArray);
        },
      },
    });
  }
}
