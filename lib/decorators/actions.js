'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonApiSupport = undefined;

var _actionHookHelpers = require('./action-hook-helpers');

function jsonifyResult(type) {
  return result => {
    const attributes = _extends({}, result);
    const id = result.id;

    delete attributes.id;

    return { type, id, attributes };
  };
}

function mutData(data) {
  return { data };
}

function jsonifyCollection(type) {
  return function (results) {
    return results.map(jsonifyResult(type));
  };
}

function checkResultExists(result) {
  if (!result) {
    console.log('Object not found');
    return Promise.reject({
      status: 500,
      data: {
        message: 'Resource not found.'
      }
    });
  }

  return result;
}

function checkResultsIsArray(results) {
  if (!Array.isArray(results)) {
    return Promise.reject('JSON API Data Collection Must Be an Array.');
  }

  return results;
}

function jsonApiSupport(type) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$collection = _ref.collection;
  let collection = _ref$collection === undefined ? false : _ref$collection;

  return function (target) {
    if (collection) {
      (0, _actionHookHelpers.addToTargetAfterHooks)(target, checkResultsIsArray, jsonifyCollection(type), mutData);
    } else {
      (0, _actionHookHelpers.addToTargetAfterHooks)(target, checkResultExists, jsonifyResult(type), mutData);
    }
  };
}

exports.jsonApiSupport = jsonApiSupport;