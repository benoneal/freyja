'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emotionServer = require('emotion-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dehydrateCSS = function dehydrateCSS() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _extractCritical = (0, _emotionServer.extractCritical)(html),
      css = _extractCritical.css,
      ids = _extractCritical.ids;

  return _react2.default.createElement('style', { 'data-emotion-css': ids.join(' '), dangerouslySetInnerHTML: { __html: css } });
};

exports.default = dehydrateCSS;