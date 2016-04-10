"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToTargetAfterHooks = addToTargetAfterHooks;
exports.createCustomizableMixin = createCustomizableMixin;
exports.createAfterHook = createAfterHook;
exports.createCustomizableAfterHook = createCustomizableAfterHook;
exports.createBeforeHook = createBeforeHook;
function addToTargetAfterHooks(target) {
  const existingHooks = target.prototype.afterHooks || [];

  for (var _len = arguments.length, hooks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    hooks[_key - 1] = arguments[_key];
  }

  Object.assign(target.prototype, { afterHooks: [...hooks, ...existingHooks] });
}

function createCustomizableMixin(cb) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return function (target) {
      Object.assign(target.prototype, cb(...args));
    };
  };
}

function createAfterHook(cb) {
  return function (target) {
    addToTargetAfterHooks(target, cb);
  };
}

function createCustomizableAfterHook(cb) {
  return function () {
    return createAfterHook(cb(...arguments));
  };
}

function createBeforeHook(cb) {
  return function (target) {
    const existingHooks = target.prototype.beforeHooks || [];

    Object.assign(target.prototype, { beforeHooks: [...existingHooks, cb] });
  };
}