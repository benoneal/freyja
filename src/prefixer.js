import {isBrowser} from './utils'

const prefixCache = {}
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
  if (!match) console.warn('Freyja: No browser match found. Vendor prefixes will be absent.')
  return match ? VENDORS[match[0]] : ''
})()

export const cssPrefix = `-${jsPrefix.toLowerCase()}-`

export const prefixProperty = (property, prefix = jsPrefix) => {
  const _key = property + prefix
  if (prefixCache[_key]) return prefixCache[_key]
  const prefixed = prefix + property.slice(0, 1).toUpperCase() + property.slice(1)

  if (property === 'justifyContent' && prefix === 'ms') {
    property = 'msFlexPack'
  }
  if (!prefix || property in supportedProperties) {
    return prefixCache[_key] = property
  } else if (ALTERNATE_PROPS[property] in supportedProperties) {
    return prefixCache[_key] = ALTERNATE_PROPS[property]
  } else if (PREFIXABLE_PROPS.find(p => property.startsWith(p)) && prefixed in supportedProperties) {
    return prefixCache[_key] = prefixed
  } else {
    return prefixCache[_key] = property
  }
}

export const prefixValue = (property, value) => {
  const _key = property + value
  if (prefixCache[_key]) return prefixCache[_key]
  if (typeof value !== 'string') return prefixCache[_key] = value
  if (property === 'content' && !value.length) return prefixCache[_key] = '""'

  const tryValue = value => {
    supportedProperties[property] = ''
    supportedProperties[property] = value
    return !!supportedProperties[property].length
  }

  try {
    if (tryValue(value)) return prefixCache[_key] = value
  } catch (err) { // IE is shit
    return prefixCache[_key] = value
  }

  const prefixed = cssPrefix + value
  if (PREFIXABLE_VALUES.find(v => value.startsWith(v)) && tryValue(prefixed)) {
    return prefixCache[_key] = prefixed
  }

  const alternate = ALTERNATE_VALUES[value].find(tryValue)
  if (alternate) return prefixCache[_key] = alternate

  return prefixCache[_key] = value
}

export const PREFIXABLE_PROPS = [
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

export const ALTERNATE_PROPS = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
}

export const PREFIXABLE_VALUES = [
  'grid',
  'inline-grid',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
]

export const ALTERNATE_VALUES = {
  'break-all': ['break-word'],
  'flex': ['-webkit-box', '-ms-flexbox', '-webkit-flex'],
  'flex-end': ['end'],
  'flex-start': ['start'],
  'space-around': ['distribute'],
  'space-between': ['justify']
}
