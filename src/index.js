import {compose, mapProps} from 'recompose'
import {css, keyframes} from 'emotion'
import {createTheming} from 'theming'

const CHANNEL = '__FREYJA__'

const freyjaTheme = createTheming(CHANNEL)

export const withTheme = freyjaTheme.withTheme
export const ThemeProvider = freyjaTheme.ThemeProvider
export const animation = keyframes

const {keys} = Object
const renderStyles = (styleHash) => keys(styleHash).reduce((acc, key) => ({
  ...acc,
  [key]: css(styleHash[key])
}), {})

export default styles => compose(
  withTheme,
  mapProps(({theme, ...props}) => ({
    ...props,
    styles: renderStyles(styles({...props, theme}))
  }))
)
