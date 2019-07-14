import React from 'react'
import {createTheming} from 'theming'
import css, {hydrate} from './css'
import {reduce, entries} from './utils'
export {animation, styleTags, StyleComponents} from './css'

const freyjaTheme = createTheming(React.createContext({}))

export const withTheme = freyjaTheme.withTheme
export const ThemeProvider = freyjaTheme.ThemeProvider
export const useTheme = freyjaTheme.useTheme

hydrate()

const renderStyles = styleMap =>
  reduce((acc, [key, val]) => {
    acc[key] = css(val)
    return acc
  }, {}, entries(styleMap))

export default (stylesFn, props = {}) =>
  renderStyles(stylesFn({...props, theme: useTheme()}))

