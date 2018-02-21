import {compose, mapProps} from 'recompose'
import {css, keyframes} from 'emotion'
import moize from 'moize'
import {createTheming} from 'theming'

const CHANNEL = '__FREYJA__'

const {withTheme, ...theme} = createTheming(CHANNEL)

export const ThemeProvider = theme.ThemeProvider
export const animation = keyframes

const m = moize({
  serialize: true,
  maxSize: 500,
  maxArgs: 1,
  maxAge: 1000 * 60 * 15
})

const {keys} = Object
const renderClassName = m(css)
const renderStyles = (styleHash) => keys(styleHash).reduce((acc, key) => ({
  ...acc,
  [key]: renderClassName(styleHash[key])
}), {})

export default (styles) => compose(
  withTheme,
  mapProps(({theme, ...props}) => ({
    ...props,
    styles: renderStyles(styles({...props, theme}))
  }))
)
