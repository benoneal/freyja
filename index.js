'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports.ThemeProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _recompose = require('recompose');

var _emotion = require('emotion');

var _moize = require('moize');

var _moize2 = _interopRequireDefault(_moize);

var _theming = require('theming');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CHANNEL = '__FREYJA__';

var _createTheming = (0, _theming.createTheming)(CHANNEL),
    withTheme = _createTheming.withTheme,
    theme = _objectWithoutProperties(_createTheming, ['withTheme']);

var ThemeProvider = exports.ThemeProvider = theme.ThemeProvider;
var animation = exports.animation = _emotion.keyframes;

var m = (0, _moize2.default)({
  serialize: true,
  maxSize: 500,
  maxArgs: 1,
  maxAge: 1000 * 60 * 15
});

var keys = Object.keys;

var renderClassName = m(_emotion.css);
var renderStyles = function renderStyles(styleHash) {
  return keys(styleHash).reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, renderClassName(styleHash[key])));
  }, {});
};

exports.default = function (styles) {
  return (0, _recompose.compose)(withTheme, (0, _recompose.mapProps)(function (_ref) {
    var theme = _ref.theme,
        props = _objectWithoutProperties(_ref, ['theme']);

    return _extends({}, props, {
      styles: renderStyles(styles(_extends({}, props, { theme: theme })))
    });
  }));
};