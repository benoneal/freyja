import {compose, mapProps} from 'recompose'
import {css, keyframes} from 'emotion'
import {createTheming} from 'theming'
import fast from 'fast.js'

const CHANNEL = '__FREYJA__'

const freyjaTheme = createTheming(CHANNEL)

export const withTheme = freyjaTheme.withTheme
export const ThemeProvider = freyjaTheme.ThemeProvider
export const animation = keyframes

const {keys} = Object
const renderStyles = styleHash => 
  fast.reduce(keys(styleHash), (acc, key) => {
    acc[key] = css(styleHash[key])
    return acc
  }, {})

export default styles => compose(
  withTheme,
  mapProps(props => ({
    ...props,
    styles: renderStyles(styles(props))
  }))
)
