'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emotionServer = require('emotion-server');

var dehydrateCSS = function dehydrateCSS() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _extractCritical = (0, _emotionServer.extractCritical)(html),
      css = _extractCritical.css,
      ids = _extractCritical.ids;

  return '<style data-emotion-css="' + ids.join(' ') + '">' + css + '</style>';
};

exports.default = dehydrateCSS;