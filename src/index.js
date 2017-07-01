import React from 'react'
import {lifecycle} from 'recompose'
import {createRenderer} from 'fela'
import {render} from 'fela-dom'
import lvha from 'fela-plugin-lvha'
import moize from 'moize'
import {withTheme, ThemeProvider as Provider} from 'theming'
import prefixPlugin from './prefixPlugin'

export * as traits from './traits'

const {keys} = Object
const CHANNEL = 'freyjaTheme'

const mediaQueryOrder = [
  '(min-width: 420px)',
  '(min-width: 580px)',
  '(min-width: 740px)',
  '(min-width: 980px)'
]

const m = moize({
  serialize: true,
  maxSize: 500,
  maxArgs: 1,
  maxAge: 1000 * 60 * 15
})

export const renderer = createRenderer({
  plugins: [lvha(), prefixPlugin],
  mediaQueryOrder
})

const renderOnMount = lifecycle({
  componentDidMount() {
    render(renderer, this.props.mountNode)
  }
})

export const ThemeProvider = renderOnMount(Provider)

const pipeReducer = (res, fn) => typeof fn === 'function' ? fn(res) : res
const pipe = (...fns) => (props) => fns.reduce(pipeReducer, props)
const renderRule = m((rule) => renderer.renderRule(() => rule))
const renderStyles = (styleHash) => keys(styleHash).reduce((acc, key) => ({
  ...acc,
  [key]: renderRule(styleHash[key])
}), {})

export default (styles, mapPropsToStyles) => {
  const render = pipe(mapPropsToStyles, styles, renderStyles)
  return (Component) => withTheme(({...props, theme}) => 
    <Component {...props} styles={render({...props, theme})} />
  )
}
