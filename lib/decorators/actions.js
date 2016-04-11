import { createAfterHook, createCustomizableAfterHook, addToTargetAfterHooks } from './action-hook-helpers';

function jsonifyResult(type) {
  return (result) => {
    const attributes = {...result};
    const {id} = result;

    delete attributes.id;

    return { type, id, attributes };
  };
}

function mutData(data) {
  return {data};
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
        message: 'Resource not found.',
      },
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

function jsonApiSupport(type, {collection = false} = {}) {
  return function (target) {
    if (collection) {
      addToTargetAfterHooks(target, checkResultsIsArray, jsonifyCollection(type), mutData);
    } else {
      addToTargetAfterHooks(target, checkResultExists, jsonifyResult(type), mutData);
    }
  };
}

export {jsonApiSupport};
