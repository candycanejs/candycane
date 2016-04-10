export default class Loader {
  rootPath;

  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  require(fullModule) {
    const [namespace, moduleName] = fullModule.split(':');

    return require(`${this.rootPath}/${namespace}s/${moduleName}`).default;
  }
}
