const {keys} = Object

// Dimension helpers
const rhythm = [0.25, 0.5, 0.6, 0.7, 0.85, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]

export const scale = (i = 0, unit = 'rem') => `${rhythm[i + 5]}${unit}`

export const media = {
  ebook: '@media screen and (min-width: 420px)',
  tablet: '@media screen and (min-width: 580px)',
  laptop: '@media screen and (min-width: 740px)',
  desktop: '@media screen and (min-width: 980px)'
}

// Typography helpers
const {pow} = Math

const scaledType = (size, typeLevel, scale) => (
  pow(scale, typeLevel) * size
)
const calc = (minSize, maxSize, minViewWidth, maxViewWidth, unit = 'px') => (
  `calc(${minSize}${unit} + (${maxSize - minSize}) * ((100vw - ${minViewWidth}${unit}) / (${maxViewWidth - minViewWidth})))`
)

export const fluidType = ({
  minFontSize = 16,
  maxFontSize = 20,
  minLeading = 1.3,
  maxLeading = 1.5,
  minViewWidth = 320,
  maxViewWidth = 1080,
  minTypeScale = 1.1,
  maxTypeScale = 1.35,
  typeLevel = 0
} = {}) => ({
  fontSize: scaledType(minFontSize, typeLevel, minTypeScale),
  lineHeight: minLeading,
  [`@media screen and (min-width: ${minViewWidth}px)`]: {
    fontSize: calc(scaledType(minFontSize, typeLevel, minTypeScale), scaledType(maxFontSize, typeLevel, maxTypeScale), minViewWidth, maxViewWidth),
    lineHeight: calc(minLeading, maxLeading, minViewWidth / minFontSize, maxViewWidth / maxFontSize, 'em')
  },
  [`@media screen and (min-width: ${maxViewWidth}px)`]: {
    fontSize: scaledType(maxFontSize, typeLevel, maxTypeScale),
    lineHeight: maxLeading
  }
})

// Color helpers
const directions = {
  up: '0deg',
  right: '90deg',
  down: '180deg',
  left: '270deg'
}

export const gradient = keys(directions).reduce((acc, direction) => ({
  ...acc,
  [direction]: (color1, color2) => ({
    backgroundImage: `linear-gradient(${directions[direction]}, ${color1}, ${color2})`
  })
}), {
  center: (color1, color2) => ({
    backgroundImage: `radial-gradient(circle, ${color1}, ${color2})`
  })
})

// Pseudo-element helpers
export const placeholder = (style) => (
[
  '::-webkit-input-placeholder',
  ':-moz-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder'
].reduce((acc, selector) => ({
  ...acc,
  [selector]: style
}), {})
)

export const rangeThumb = (style) => (
[
  '::-webkit-slider-thumb',
  '::-moz-range-thumb',
  '::-ms-thumb'
].reduce((acc, selector) => ({
  ...acc,
  [selector]: style
}), {})
)

export const rangeTrack = (style) => (
[
  '::-webkit-slider-runnable-track',
  '::-moz-range-track',
  '::-ms-track'
].reduce((acc, selector) => ({
  ...acc,
  [selector]: style
}), {})
)

// Flex helpers
export const layout = {
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
}

// Transition helpers
export const ease = {
  bounce: 'cubic-bezier(.44,-0.1,.72,1.34)',
  out: 'cubic-bezier(.37,.54,.66,.99)',
  in: 'cubic-bezier(.36,.01,.8,.65)'
}

export const transition = keys(ease).reduce((acc, easing) => ({
  ...acc,
  [easing]: {
    fast: {transition: `all 200ms ${ease[easing]}`},
    medium: {transition: `all 320ms ${ease[easing]}`},
    slow: {transition: `all 480ms ${ease[easing]}`}
  }
}), {
  fast: {transition: 'all 200ms ease-in-out'},
  medium: {transition: 'all 320ms ease-in-out'},
  slow: {transition: 'all 480ms ease-in-out'}
})
