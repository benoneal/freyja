# Freyja

A full-featured functional CSS-in-JS solution, adapted from [CXS](https://github.com/cxs-css/cxs) to make it suitable for production websites. You provide a function accepting component `props` and your application's `theme`, and returning a map of styles (`({...props, theme}) => ({key1: style, key2: style})`), and your component will receive a `styles` prop containing a map of classnames (`styles = {key1: className, key2: className}`).

- Everything CXS has plus:
- An efficient functional API for complex components
- Server-side rendering and client-side hydration
- Comprehensive and performant vendor prefixing
- Animation keyframes
- Ordered media-queries to ensure correct cascade precedence
- React hook API (`useStyles`)

## How to use

Install via `npm i freyja`.

Create your styled component.

```js
import withStyles from 'freyja'

// this could be in a separate file if you like
const titleStyles = ({
  color,
  theme: {
    font,
    scale
  }
}) => ({
  wrapper: {
    textAlign: 'center',
    padding: scale.large
  },
  title: {
    color,
    fontFamily: font.display
  }
})

const Title = ({,
  text,
  styles,
  children
}) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>{text || children}</h1>
  </div>
)

export const withStyles(titleStyles)(Title)

// use like: <Title color={'red'} text={'My first title'} />
```

Or using react hooks:

```js
import {useStyles} from 'freyja'

// this could be in a separate file if you like
const titleStyles = ({
  color,
  theme: {
    font,
    scale
  }
}) => ({
  wrapper: {
    textAlign: 'center',
    padding: scale.large
  },
  title: {
    color,
    fontFamily: font.display
  }
})

const Title = props => {
  const {wrapper, title} = useStyles(titleStyles, props)
  const {text, children} = props
  return (
    <div className={wrapper}>
      <h1 className={title}>{text || children}</h1>
    </div>
  )
}

export const Title

// use like: <Title color={'red'} text={'My first title'} />
```

Wrap your app in a `ThemeProvider` (must have only 1 child). Multiple `ThemeProviders` can be nested, with merged themes only accessible to children within the nested provider:

```js
import {ThemeProvider, animation} from 'freyja'
import * as traits from 'freyja/traits' // optional helper methods

const theme = {
  ...traits,
  font: {
    display: 'Merriweather',
    copy: 'Helvetica'
  },
  scale: {
    small: 12,
    medium: 16,
    large: 24
  },
  animations: {
    spin: animation({ // create named animations with full keyframe support
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    })
  }
}

const App = ({children}) => (
  <ThemeProvider theme={theme}>
    <>{children}</>
  </ThemeProvider>
)

export default App
```

### Server-side rendering

Simply call the `styleTags` dehydration function to receive a string of `style` tags to insert in your document. Styles will automatically be hydrated on the client.

If rendering your views with React on the server, `StyleComponents` can be used in the `<head>`, like: `<head><StyleComponents /></head>`

```js
import React from 'react'
import {renderToString} from 'react-dom/server'
import {styleTags} from 'freyja'
import App from './App'

const renderMiddleware = (req, res) => {
  const appHTML = renderToString(<App />)
  const appStyleTags = styleTags()

  res.send(`
    <!doctype html>
    <html>
      <head>
        ${appStyleTags}
      </head>
      <body>
        ${appHTML}
      </body>
    </html>
  `)
}
```

