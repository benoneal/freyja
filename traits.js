'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keys = Object.keys;

// Dimension helpers

var rhythm = [0.25, 0.5, 0.6, 0.7, 0.85, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20];

var scale = exports.scale = function scale() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rem';
  return '' + rhythm[i + 5] + unit;
};

var media = exports.media = {
  ebook: '@media screen and (min-width: 420px)',
  tablet: '@media screen and (min-width: 580px)',
  laptop: '@media screen and (min-width: 740px)',
  desktop: '@media screen and (min-width: 980px)'

  // Typography helpers
};var pow = Math.pow;


var scaledType = function scaledType(size, typeLevel, scale) {
  return pow(scale, typeLevel) * size;
};
var calc = function calc(minSize, maxSize, minViewWidth, maxViewWidth) {
  var unit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'px';
  return 'calc(' + minSize + unit + ' + (' + (maxSize - minSize) + ') * ((100vw - ' + minViewWidth + unit + ') / (' + (maxViewWidth - minViewWidth) + ')))';
};

var fluidType = exports.fluidType = function fluidType() {
  var _ref2;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$minFontSize = _ref.minFontSize,
      minFontSize = _ref$minFontSize === undefined ? 16 : _ref$minFontSize,
      _ref$maxFontSize = _ref.maxFontSize,
      maxFontSize = _ref$maxFontSize === undefined ? 20 : _ref$maxFontSize,
      _ref$minLeading = _ref.minLeading,
      minLeading = _ref$minLeading === undefined ? 1.3 : _ref$minLeading,
      _ref$maxLeading = _ref.maxLeading,
      maxLeading = _ref$maxLeading === undefined ? 1.5 : _ref$maxLeading,
      _ref$minViewWidth = _ref.minViewWidth,
      minViewWidth = _ref$minViewWidth === undefined ? 320 : _ref$minViewWidth,
      _ref$maxViewWidth = _ref.maxViewWidth,
      maxViewWidth = _ref$maxViewWidth === undefined ? 1080 : _ref$maxViewWidth,
      _ref$minTypeScale = _ref.minTypeScale,
      minTypeScale = _ref$minTypeScale === undefined ? 1.1 : _ref$minTypeScale,
      _ref$maxTypeScale = _ref.maxTypeScale,
      maxTypeScale = _ref$maxTypeScale === undefined ? 1.35 : _ref$maxTypeScale,
      _ref$typeLevel = _ref.typeLevel,
      typeLevel = _ref$typeLevel === undefined ? 0 : _ref$typeLevel;

  return _ref2 = {
    fontSize: scaledType(minFontSize, typeLevel, minTypeScale),
    lineHeight: minLeading
  }, _defineProperty(_ref2, '@media screen and (min-width: ' + minViewWidth + 'px)', {
    fontSize: calc(scaledType(minFontSize, typeLevel, minTypeScale), scaledType(maxFontSize, typeLevel, maxTypeScale), minViewWidth, maxViewWidth),
    lineHeight: calc(minLeading, maxLeading, minViewWidth / minFontSize, maxViewWidth / maxFontSize, 'em')
  }), _defineProperty(_ref2, '@media screen and (min-width: ' + maxViewWidth + 'px)', {
    fontSize: scaledType(maxFontSize, typeLevel, maxTypeScale),
    lineHeight: maxLeading
  }), _ref2;
};

// Color helpers
var directions = {
  up: '0deg',
  right: '90deg',
  down: '180deg',
  left: '270deg'
};

var gradient = exports.gradient = keys(directions).reduce(function (acc, direction) {
  return _extends({}, acc, _defineProperty({}, direction, function (color1, color2) {
    return {
      backgroundImage: 'linear-gradient(' + directions[direction] + ', ' + color1 + ', ' + color2 + ')'
    };
  }));
}, {
  center: function center(color1, color2) {
    return {
      backgroundImage: 'radial-gradient(circle, ' + color1 + ', ' + color2 + ')'
    };
  }
});

// Pseudo-element helpers
var placeholder = exports.placeholder = function placeholder(style) {
  return ['::-webkit-input-placeholder', ':-moz-placeholder', '::-moz-placeholder', ':-ms-input-placeholder'].reduce(function (acc, selector) {
    return _extends({}, acc, _defineProperty({}, selector, style));
  }, {});
};

var rangeThumb = exports.rangeThumb = function rangeThumb(style) {
  return ['::-webkit-slider-thumb', '::-moz-range-thumb', '::-ms-thumb'].reduce(function (acc, selector) {
    return _extends({}, acc, _defineProperty({}, selector, style));
  }, {});
};

var rangeTrack = exports.rangeTrack = function rangeTrack(style) {
  return ['::-webkit-slider-runnable-track', '::-moz-range-track', '::-ms-track'].reduce(function (acc, selector) {
    return _extends({}, acc, _defineProperty({}, selector, style));
  }, {});
};

// Flex helpers
var layout = exports.layout = {
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  center_h: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center'
  },
  center_v: {
    display: 'flex',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'left'
  }

  // Transition helpers
};var ease = exports.ease = {
  bounce: 'cubic-bezier(.44,-0.1,.72,1.34)',
  out: 'cubic-bezier(.37,.54,.66,.99)',
  in: 'cubic-bezier(.36,.01,.8,.65)'
};

var transition = exports.transition = keys(ease).reduce(function (acc, easing) {
  return _extends({}, acc, _defineProperty({}, easing, {
    fast: { transition: 'all 200ms ' + ease[easing] },
    medium: { transition: 'all 320ms ' + ease[easing] },
    slow: { transition: 'all 480ms ' + ease[easing] }
  }));
}, {
  fast: { transition: 'all 200ms ease-in-out' },
  medium: { transition: 'all 320ms ease-in-out' },
  slow: { transition: 'all 480ms ease-in-out' }
});