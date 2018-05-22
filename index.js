'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports.ThemeProvider = exports.withTheme = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _recompose = require('recompose');

var _emotion = require('emotion');

var _theming = require('theming');

var _fast = require('fast.js');

var _fast2 = _interopRequireDefault(_fast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANNEL = '__FREYJA__';

var freyjaTheme = (0, _theming.createTheming)(CHANNEL);

var withTheme = exports.withTheme = freyjaTheme.withTheme;
var ThemeProvider = exports.ThemeProvider = freyjaTheme.ThemeProvider;
var animation = exports.animation = _emotion.keyframes;

var keys = Object.keys;

var renderStyles = function renderStyles(styleHash) {
  return _fast2.default.reduce(keys(styleHash), function (acc, key) {
    acc[key] = (0, _emotion.css)(styleHash[key]);
    return acc;
  }, {});
};

exports.default = function (styles) {
  return (0, _recompose.compose)(withTheme, (0, _recompose.mapProps)(function (props) {
    return _extends({}, props, {
      styles: renderStyles(styles(props))
    });
  }));
};