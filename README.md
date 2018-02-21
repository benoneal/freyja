# Freyja

A functional interface for Emotion. You provide a function accepting component `props` and your application's `theme`, and returning a map of styles (`({...props, theme}) => ({key1: style, key2: style})`), and your component will receive a `styles` prop containing a map of classnames (`styles = {key1: className, key2: className}`).

## How to use

Install via `npm i freyja`.

Create your styled component.  

```js
import withStyles from 'freyja'

// this could be in a separate file if you like
const styles = ({
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

export const withStyles(styles)(Title)

// use like: <Title color={'red'} text={'My first title'} />
```

Wrap your app in a `ThemeProvider` (must have only 1 child). Multiple `ThemeProviders` can be nested, with merged themes only accessible to children within the nested provider: 

```js
import {ThemeProvider} from 'freyja'
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
  }
}

const App = ({children}) => (
  <ThemeProvider theme={theme}>
    <div>
      {children}
    </div>
  </ThemeProvider>
)

export default App
```

### Server-side rendering

Simply pass your rendered html (via `ReactDomServer.renderToString`) to the `dehydrateCSS` method, to receive a `style` tag you can insert in your document. Styles will automatically be hydrated on the client, so client rendering is just as you'd normally do. 

```
import React from 'react'
import {renderToString} from 'react-dom/server'
import dehydrateCSS from 'freyja/ssr'
import App from './App'

const renderMiddleware = (req, res) => {
  const appHTML = renderToString(<App />)
  const appCSS = dehydrateCSS(appHTML)

  res.send(`
    <!doctype html>
    <html>
      <head>
        ${appCSS}
      </head>
      <body>
        ${appHTML}
      </body>
    </html>
  `)
}
```
