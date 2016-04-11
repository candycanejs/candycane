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
}
