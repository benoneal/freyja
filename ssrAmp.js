'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emotionServer = require('emotion-server');

var dehydrateCSS = function dehydrateCSS() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _emotionServer.extractCritical)(html).css;
};

exports.default = dehydrateCSS;