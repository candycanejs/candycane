const Babel = require('broccoli-babel-transpiler');

const babelScript = Babel('lib', {
  "presets": ["es2015-node5", "stage-0"],
  "plugins": ["transform-decorators-legacy"]
});

module.exports = babelScript;
