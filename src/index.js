import React from 'react'
import {createTheming} from 'theming'
import css, {hydrate, animation} from './css'
import * as traits from './traits'
export {styleTags, StyleComponents} from './css'

const {entries} = Object
const helpers = {...traits, animation}

const freyjaTheme = createTheming(React.createContext({}))

export const withTheme = freyjaTheme.withTheme
export const ThemeProvider = freyjaTheme.ThemeProvider
export const useTheme = freyjaTheme.useTheme

hydrate()

const renderStyles = styleMap =>
  entries(styleMap).reduce((acc, [key, val]) => {
    acc[key] = css(val)
    return acc
  }, {})

export default (stylesFn, props = {}) =>
  renderStyles(stylesFn(useTheme(), props, helpers))
