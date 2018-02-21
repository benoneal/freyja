import React from 'react'
import {renderToString} from 'react-dom/server'
import {describe, it} from 'mocha'
import assert from 'assert'
import withStyles, {ThemeProvider} from '../src'
import dehydrateCSS from '../src/ssr'

const testTheme = {
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

const Title = withStyles(styles)(({
  text,
  styles,
  children
}) =>
  <div className={styles.wrapper}>
    <h1 className={styles.title}>{text || children}</h1>
  </div>
)

const subject = () => renderToString(
  <ThemeProvider theme={testTheme}>
    <Title color={'red'} text={'My test title'} />
  </ThemeProvider>
)

describe('Freyja', () => {
  it('generates valid styled markup with classNames', () => {
    assert(subject() === '<div class="css-6fytqd" data-reactroot=""><h1 class="css-1mhbhs2">My test title</h1></div>')
  })

  it('renders dehydrated CSS for SSR', () => {
    assert(dehydrateCSS(subject()) === '<style data-emotion-css="6fytqd 1mhbhs2">.css-6fytqd{text-align:center;padding:24px;}.css-1mhbhs2{color:red;font-family:Merriweather;}</style>')
  })
})
