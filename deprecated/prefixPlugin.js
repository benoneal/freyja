import moize from 'moize'

const m = moize({
  serialize: true,
  maxSize: 1000,
  maxArgs: 2,
  maxAge: 1000 * 60 * 15
})

const {isArray} = Array

const hasWindow = () => typeof window !== 'undefined'
const hasDocument = () => typeof document !== 'undefined'
const isBrowser = (() => hasWindow() && hasDocument() && document.nodeType === 9)()

const kebab = (key) => key.replace(/([A-Z]|^ms|^webkit)/g, g => '-' + g.toLowerCase())

const supportedProperties = (() => isBrowser ? document.createElement('p').style : {})()

const VENDORS = {
  opera: 'O',
  chrome: 'webkit',
  safari: 'Webkit',
  firefox: 'Moz',
  fban: 'Webkit',
  fbav: 'Webkit',
  msie: 'ms',
  node: ''
}

const jsPrefix = (() => {
  if (typeof navigator === 'undefined') return ''
  const ua = navigator.userAgent || navigator.vendor || (isBrowser && window.opera)
  const match = /(opera|msie|firefox|chrome|safari|fban|fbav|node)/.exec(ua.toLowerCase())
  return match ? VENDORS[match[0]] : ''
})()

export const cssPrefix = `-${jsPrefix.toLowerCase()}-`

export const prefixProperty = m((property, prefix = jsPrefix) => {
  const prefixed = prefix + property.slice(0, 1).toUpperCase() + property.slice(1)

  if (property === 'justifyContent' && prefix === 'ms') {
    property = 'msFlexPack'
  }
  if (!prefix || property in supportedProperties) {
    return property
  } else if (ALTERNATE_PROPS[property] in supportedProperties) {
    return ALTERNATE_PROPS[property]
  } else if (PREFIXABLE_PROPS.find((p) => property.startsWith(p)) && prefixed in supportedProperties) {
    return prefixed
  } else {
    return property
  }
})

export const prefixValue = m((property, value) => {
  if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value
  if (property === 'content' && !value.length) value = '""'

  const tryValue = (value) => {
    supportedProperties[property] = ''
    supportedProperties[property] = value
    return !!supportedProperties[property].length
  }

  try {
    tryValue(value)
  } catch (err) { // IE is shit
    return value
  }

  const prefixed = cssPrefix + value
  const alternate = isArray(ALTERNATE_VALUES[value]) && ALTERNATE_VALUES[value].find(tryValue)

  if (tryValue(value)) {
    return value
  } else if (PREFIXABLE_VALUES.find((v) => value.startsWith(v)) && tryValue(prefixed)) {
    return prefixed
  } else if (alternate) {
    return alternate
  } else {
    return value
  }
})

const addVendorPrefixes = m((style) => {
  const prefixedStyle = {}

  for (const property in style) {
    const value = style[property]

    if (value instanceof Object) {
      prefixedStyle[property] = addVendorPrefixes(value)
    } else {
      prefixedStyle[kebab(prefixProperty(property))] = prefixValue(property, addPx(property, value))
    }
  }

  return prefixedStyle
})

export default addVendorPrefixes

const addPx = (prop, value) => {
  if (typeof value !== 'number' || unitlessProps[prop]) return value
  return value + 'px'
}

const PREFIXABLE_PROPS = [
  'accelerator',
  'animation',
  'appearance',
  'aspectRatio',
  'backdropFilter',
  'backfaceVisibility',
  'backgroundComposite',
  'binding',
  'blockProgression',
  'borderAfter',
  'borderBefore',
  'borderEnd',
  'borderFit',
  'borderStart',
  'borderVerticalSpacing',
  'box',
  'column',
  'filter',
  'flex',
  'flow',
  'fontFeatureSettings',
  'fontSizeDelta',
  'fontSmoothing',
  'grid',
  'hyphenate',
  'hyphens',
  'imageRegion',
  'initialLetter',
  'line',
  'locale',
  'logical',
  'marginAfter',
  'marginBefore',
  'marginBottomCollapse',
  'marginCollapse',
  'marginEnd',
  'marginFit',
  'marginStart',
  'marginTopCollapse',
  'marquee',
  'mask',
  'math',
  'objectFit',
  'perspective',
  'scrollSnap',
  'textAlignLast',
  'textDecoration',
  'textFill',
  'textJustify',
  'textOrientation',
  'textSecurity',
  'textSizeAdjust',
  'textStroke',
  'textUnderline',
  'textZoom',
  'textOverflow',
  'transform',
  'userSelect',
  'wordBreak',
  'wrap'
]

const ALTERNATE_PROPS = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
}

const PREFIXABLE_VALUES = [
  'grid',
  'inline-grid',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient'
]

const ALTERNATE_VALUES = {
  'break-all': ['break-word'],
  'flex': ['-webkit-box', '-ms-flexbox', '-webkit-flex'],
  'flex-end': ['end'],
  'flex-start': ['start'],
  'space-around': ['distribute'],
  'space-between': ['justify']
}

const unitlessProps = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
}
