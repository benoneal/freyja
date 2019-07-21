function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(require("react")),theming=require("theming"),abab=require("abab");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(e){_defineProperty(r,e,t[e])})}return r}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,r){var t=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return t}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var isNode="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),hasWindow=function(e){return"undefined"!=typeof window},hasDocument=function(e){return"undefined"!=typeof document},isBrowser=!isNode&&hasWindow()&&hasDocument()&&9===document.nodeType,isMediaQuery=function(e){var r=0<arguments.length&&void 0!==e?e:"";return"@"===r[0]&&"m"===r[1]},find=function(e,r){for(var t,n=1<arguments.length&&void 0!==r?r:[],i=-1,o=n.length;++i<o&&!t;)t=e(n[i]);return t},push=function(e,r){return r[r.length++]=e,r},forEach=function(e,r,t){for(var n=2<arguments.length&&void 0!==t?t:function(e){return!0},i=-1,o=r.length;++i<o;)n(r[i],i)&&e(r[i],i)},mutMap=function(t,n){return forEach(function(e,r){return n[r]=t(e,r)},n),n},reduce=function(e,r,t){for(var n=-1,i=t.length;++n<i;)r=e(r,t[n],n);return r},forEntries=function(e,r,t){var n,i=!(2<arguments.length&&void 0!==t)||t;for(n in r)(i||r.hasOwnProperty(n))&&e(n,r[n])},entries=function(e){var t=[];return forEntries(function(e,r){return push([e,r],t)},e,!1),t},prefixCache={},supportedProperties=isBrowser?document.createElement("p").style:{},VENDORS={opera:"O",chrome:"webkit",safari:"Webkit",firefox:"Moz",fban:"Webkit",fbav:"Webkit",msie:"ms",node:""},jsPrefix=function(){if("undefined"==typeof navigator)return"";var e=navigator.userAgent||navigator.vendor||isBrowser&&window.opera,r=/(opera|msie|firefox|chrome|safari|fban|fbav|node)/.exec(e.toLowerCase());return r||console.warn("Freyja: No browser match found. Vendor prefixes will be absent."),r?VENDORS[r[0]]:""}(),cssPrefix="-".concat(jsPrefix.toLowerCase(),"-"),prefixProperty=function(r,e){var t=1<arguments.length&&void 0!==e?e:jsPrefix,n=r+t;if(prefixCache[n])return prefixCache[n];var i=t+r.slice(0,1).toUpperCase()+r.slice(1);return"justifyContent"===r&&"ms"===t&&(r="msFlexPack"),!t||r in supportedProperties?prefixCache[n]=r:ALTERNATE_PROPS[r]in supportedProperties?prefixCache[n]=ALTERNATE_PROPS[r]:find(function(e){return r.startsWith(e)},PREFIXABLE_PROPS)&&i in supportedProperties?prefixCache[n]=i:prefixCache[n]=r},prefixValue=function(r,t){var n=r+t;if(prefixCache[n])return prefixCache[n];if("string"!=typeof t)return prefixCache[n]=t;if("content"===r&&!t.length)return prefixCache[n]='""';function e(e){return supportedProperties[r]="",supportedProperties[r]=e,!!supportedProperties[r].length}try{if(e(t))return prefixCache[n]=t}catch(e){return prefixCache[n]=t}var i=cssPrefix+t;if(find(function(e){return t.startsWith(e)},PREFIXABLE_VALUES)&&e(i))return prefixCache[n]=i;var o=find(e,ALTERNATE_VALUES[t]);return prefixCache[n]=o||t},PREFIXABLE_PROPS=["accelerator","animation","appearance","aspectRatio","backdropFilter","backfaceVisibility","backgroundComposite","binding","blockProgression","borderAfter","borderBefore","borderEnd","borderFit","borderStart","borderVerticalSpacing","box","column","filter","flex","flow","fontFeatureSettings","fontSizeDelta","fontSmoothing","grid","hyphenate","hyphens","imageRegion","initialLetter","line","locale","logical","marginAfter","marginBefore","marginBottomCollapse","marginCollapse","marginEnd","marginFit","marginStart","marginTopCollapse","marquee","mask","math","objectFit","perspective","scrollSnap","textAlignLast","textDecoration","textFill","textJustify","textOrientation","textSecurity","textSizeAdjust","textStroke","textUnderline","textZoom","textOverflow","transform","userSelect","wordBreak","wrap"],ALTERNATE_PROPS={alignContent:"msFlexLinePack",alignSelf:"msFlexItemAlign",alignItems:"msFlexAlign",justifyContent:"msFlexPack",order:"msFlexOrder",flexGrow:"msFlexPositive",flexShrink:"msFlexNegative",flexBasis:"msPreferredSize"},PREFIXABLE_VALUES=["grid","inline-grid","linear-gradient","radial-gradient","repeating-linear-gradient","repeating-radial-gradient"],ALTERNATE_VALUES={"break-all":["break-word"],flex:["-webkit-box","-ms-flexbox","-webkit-flex"],"flex-end":["end"],"flex-start":["start"],"space-around":["distribute"],"space-between":["justify"]},unitlessProps={animationIterationCount:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,stopOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0},injectSheet=function(e,r){var t=e.createElement("iframe");return t.id=r,e.head.appendChild(t),t},createSheet=function(e,r){var t=(e.getElementById(r)||injectSheet(e,r)).sheet;return function(e){return t.insertRule(e,t.cssRules.length)}},noop=function(){},sheets={keyframes:isBrowser?createSheet(document,"__freyja_keyframes"):noop,classes:isBrowser?createSheet(document,"__freyja_classes"):noop,mediaqueries:isBrowser?createSheet(document,"__freyja_mediaqueries"):noop},rules={keyframes:[],classes:[],mediaqueries:[]},cache={},ruleCount=0,prefix="f",insert=function(e,r){isBrowser||rules[r].push(e),sheets[r](e),ruleCount++},hyph=function(e){return prefixProperty(e).replace(/[A-Z]|^ms|^webkit/g,"-$&").toLowerCase()},px=function(e,r){return"number"!=typeof r?prefixValue(e,r):unitlessProps[e]?r:"".concat(r,"px")},mx=function(e,r){return r?"".concat(r,"{").concat(e,"}"):e},kf=function(e,r,t){return"@".concat(t?cssPrefix:"","keyframes ").concat(e," {").concat(r,"}")},rx=function(e,r,t){return".".concat(e,"{").concat(hyph(r),":").concat(px(r,t),"}")},noAnd=function(e){return e.replace(/&/g,"")},hash=function(e,r){for(var t=1<arguments.length&&void 0!==r?r:"an",n=5381,i=e.length;i;)n=33*n^e.charCodeAt(--i);return t+(n>>>0).toString(36)},animation=function(e){var r=hash(JSON.stringify(e));if(cache[r])return cache[r];var t=mutMap(function(e){var r=_slicedToArray(e,2),t=r[0],n=r[1];return"".concat(t," {").concat(reduce(function(e,r){var t=_slicedToArray(r,2),n=t[0],i=t[1];return"".concat(e).concat(hyph(n),":").concat(px(n,i),";")},"",entries(n)),"}")},entries(e)).join(" ");return insert(kf(r,t,!0),"keyframes"),insert(kf(r,t),"keyframes"),cache[r]=r},css=function c(e,r,t){var u=1<arguments.length&&void 0!==r?r:"",f=2<arguments.length?t:void 0;return mutMap(function(e){var r=_slicedToArray(e,2),t=r[0],n=r[1];if(null===n)return"";if("object"===_typeof(n)){var i=isMediaQuery(t)?t:null;return c(n,i?u:u+t,i||f)}var o=t+n+u+f;if(cache[o])return cache[o];var a=f?"mediaqueries":"classes",s=prefix+ruleCount.toString(36);return insert(mx(rx(s+noAnd(u),t,n),f),a),cache[o]=s},entries(e)).join(" ")},styleData=function(e){return[rules.keyframes.join(""),rules.classes.join(""),rules.mediaqueries.join(""),abab.btoa(JSON.stringify(cache)),ruleCount]},reset=function(e){cache={},forEntries(function(e){return rules[e]=[]},rules),ruleCount=0},styleTags=function(){var e=_slicedToArray(styleData(),5),r=e[0],t=e[1],n=e[2],i=e[3],o=e[4];return reset(),'<style id="__freyja_keyframes">'.concat(r,'</style><style id="__freyja_classes" data-freyja-rules="').concat(o,'" data-freyja-cache="').concat(i,'">').concat(t,'</style><style id="__freyja_mediaqueries">').concat(n,"</style>")},StyleComponents=function(){var e=_slicedToArray(styleData(),5),r=e[0],t=e[1],n=e[2],i=e[3],o=e[4];return reset(),React.createElement(React.Fragment,null,React.createElement("style",{id:"__freyja_keyframes"},r),React.createElement("style",{id:"__freyja_classes","data-freyja-rules":o,"data-freyja-cache":i},t),React.createElement("style",{id:"__freyja_mediaqueries"},n))},hydrate=function(e){if(isBrowser){var r=document.getElementById("__freyja_classes");r&&(cache=JSON.parse(abab.atob(r.dataset.freyjaCache)),ruleCount=parseInt(r.dataset.freyjaRules))}},freyjaTheme=theming.createTheming(React.createContext({})),withTheme=freyjaTheme.withTheme,ThemeProvider=freyjaTheme.ThemeProvider,useTheme=freyjaTheme.useTheme;hydrate();var renderStyles=function(e){return reduce(function(e,r){var t=_slicedToArray(r,2),n=t[0],i=t[1];return e[n]=css(i),e},{},entries(e))},index=function(e){return renderStyles(e(_objectSpread({},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},{theme:useTheme()})))};exports.StyleComponents=StyleComponents,exports.ThemeProvider=ThemeProvider,exports.animation=animation,exports.default=index,exports.styleTags=styleTags,exports.useTheme=useTheme,exports.withTheme=withTheme;
