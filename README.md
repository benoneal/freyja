# Freyja

A full-featured functional CSS-in-JS solution, adapted from [CXS](https://github.com/cxs-css/cxs) to make it suitable for production websites. You provide a function accepting component `props` and your application's `theme`, and returning a map of styles (`(theme, props, helpers) => ({key1: style, key2: style})`), and `useStyles` will return a map of classnames (like `{key1: className, key2: className}`).

- Everything CXS has plus:
- React hook API
- An efficient functional design for complex components
- Server-side rendering and client-side hydration
- Comprehensive and performant vendor prefixing
- Animation keyframes
- Ordered media-queries to ensure correct cascade precedence

## How to use

Install via `npm i freyja`.

Create your styled component.

```js
import useStyles from 'freyja'

// this could be in a separate file if you like
const titleStyles = ({font, scale}, {color}, {animation}) => ({
  wrapper: {
    textAlign: 'center',
    padding: scale.large
  },
  title: {
    color,
    fontFamily: font.display,
    animationName: animation({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    })
  }
})

const Title = props => {
  const styles = useStyles(titleStyles, props)
  const {text, children} = props
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{text || children}</h1>
    </div>
  )
}

export default Title

// use like: <Title color={'red'} text={'My first title'} />
```

Wrap your app in a `ThemeProvider` (must have only 1 child). Multiple `ThemeProviders` can be nested, with merged themes only accessible to children within the nested provider:

```js
import {ThemeProvider, animation} from 'freyja'

const theme = {
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
  const appStyleTags = styleTags() // must be called AFTER renderToString()

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

