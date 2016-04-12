import Loader from './loader';

export default class Application {
  constructor(options = {}) {
    Object.assign(this, options);

    this.loader = options.loader || new Loader(options.projectDir);
  }

  singleton(name, instance) {
    this.loader.register(name, instance);
  }

  make(name) {
    return this.loader.make(name);
  }

  boot() {
    this.config.providers.forEach((provider) => {
        this.runProvider(provider);
    });
  }

  runProvider(curr) {
    const module = this.loader.requireNpm(curr);
    const klass = module.default || module;

    const provider = new klass(this);

    provider.register();
  }

  pathsForNamespace(namespace) {
    return this.loader.pathsForNamespace(namespace);
  }
}
