# Freyja

A convenience interface for Fela. Pass a `styles` map to components. `styles` is a map of classnames, generated by parsing props and theme to your styles function, which returns a style map. It sounds more complicated that it is. 

## How to use

Install via `npm i -S freyja` or `yarn add freyja`.

Create your styled component.  

```js
import withStyles from 'freyja'

// this could be in a separate file if you like
const styles = ({
  color,
  theme: {
    font
  }
}) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color,
    fontFamily: font.display
  }
})

const Title = ({,
  text,
  styles
}) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>{text}</h1>
  </div>
)

export const withStyles(styles)(Title)

// use like: <Title color={'red'} />
```

Wrap your app in a `ThemeProvider`: 

```js
import {renderer, ThemeProvider} from 'freyja'
import theme from './theme' 
// theme is just a map of common values or helper methods
// that all style functions will have access to

const styleSheet = (() => {
  if (typeof window === 'undefined') return
  return document.getElementById('stylesheet')
})()

const App = ({children}) => (
  <ThemeProvider theme={theme} mountNode={styleSheet}>
    <div>
      {children}
    </div>
  </ThemeProvider>
)

export default App
```
