export {Provider as StyleProvider, ThemeProvider} from 'react-fela'
import {createRenderer} from 'fela'
import {connect} from 'react-fela'
import lvha from 'fela-plugin-lvha'
import prefixPlugin from './prefixPlugin'

const {keys} = Object

const mediaQueryOrder = [
  '(min-width: 420px)',
  '(min-width: 580px)',
  '(min-width: 740px)',
  '(min-width: 980px)'
]

export const renderer = createRenderer({
  plugins: [lvha(), prefixPlugin],
  mediaQueryOrder
})

const withStyles = (styles, mapPropsToStyleParams) => (props) => (renderer) => {
  const renderedStyles = styles(mapPropsToStyleParams(props))
  return keys(renderedStyles).reduce((acc, key) => ({
    ...acc,
    [key]: renderer.renderRule(() => renderedStyles[key])
  }), {})
}

export default (styles, mapPropsToStyleParams = (props) => props) => connect(withStyles(styles, mapPropsToStyleParams))
