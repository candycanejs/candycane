export function addToTargetAfterHooks(target, ...hooks) {
  const existingHooks = target.prototype.afterHooks || [];

  Object.assign(target.prototype, {afterHooks: [...hooks, ...existingHooks]});
}

export function createCustomizableMixin(cb) {
  return function (...args) {
    return function (target) {
      Object.assign(target.prototype, cb(...args));
    };
  };
}

export function createAfterHook(cb) {
  return function (target) {
    addToTargetAfterHooks(target, cb);
  };
}

export function createCustomizableAfterHook(cb) {
  return function (...args) {
    return createAfterHook(cb(...args));
  };
}

export function createBeforeHook(cb) {
  return function (target) {
    const existingHooks = target.prototype.beforeHooks || [];

    Object.assign(target.prototype, {beforeHooks: [...existingHooks, cb]});
  };
}
