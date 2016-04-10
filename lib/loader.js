'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
let Loader = class Loader {

  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  require(fullModule) {
    var _fullModule$split = fullModule.split(':');

    var _fullModule$split2 = _slicedToArray(_fullModule$split, 2);

    const namespace = _fullModule$split2[0];
    const moduleName = _fullModule$split2[1];

    return require(`${ this.rootPath }/${ namespace }s/${ moduleName }`).default;
  }
};
exports.default = Loader;