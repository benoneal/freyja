import React from 'react'
import {renderToString} from 'react-dom/server'
import useStyles, {animation, styleTags, StyleComponents, ThemeProvider} from '../src'

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
    fontFamily: font.display,
    animationName: animation({
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    })
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

const subject = () => renderToString(
  <ThemeProvider theme={testTheme}>
    <Title color={'red'} text={'My test title'} />
  </ThemeProvider>
)

describe('Freyja', () => {
  it('generates valid styled markup with classNames', () => {
    expect(subject()).toBe('<div class="f2 f3"><h1 class="f4 f5 f6">My test title</h1></div>')
  })

  it('renders dehydrated CSS as style tag strings for SSR', () => {
    subject()
    expect(styleTags()).toBe('<style id=\"__freyja_keyframes\">@--keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}@keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}</style><style id=\"__freyja_classes\" data-freyja-rules=\"7\" data-freyja-cache=\"eyJhbndjbmJhZiI6ImFud2NuYmFmIiwidGV4dEFsaWduY2VudGVydW5kZWZpbmVkIjoiZjIiLCJwYWRkaW5nMjR1bmRlZmluZWQiOiJmMyIsImNvbG9ycmVkdW5kZWZpbmVkIjoiZjQiLCJmb250RmFtaWx5TWVycml3ZWF0aGVydW5kZWZpbmVkIjoiZjUiLCJhbmltYXRpb25OYW1lYW53Y25iYWZ1bmRlZmluZWQiOiJmNiJ9\">.f2{text-align:center}.f3{padding:24px}.f4{color:red}.f5{font-family:Merriweather}.f6{animation-name:anwcnbaf}</style><style id=\"__freyja_mediaqueries\"></style>')
  })

  it('renders dehydrated CSS as react style components for SSR', () => {
    subject()
    expect(renderToString(<StyleComponents />)).toBe('<style id=\"__freyja_keyframes\">@--keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}@keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}</style><style id=\"__freyja_classes\" data-freyja-rules=\"7\" data-freyja-cache=\"eyJhbndjbmJhZiI6ImFud2NuYmFmIiwidGV4dEFsaWduY2VudGVydW5kZWZpbmVkIjoiZjIiLCJwYWRkaW5nMjR1bmRlZmluZWQiOiJmMyIsImNvbG9ycmVkdW5kZWZpbmVkIjoiZjQiLCJmb250RmFtaWx5TWVycml3ZWF0aGVydW5kZWZpbmVkIjoiZjUiLCJhbmltYXRpb25OYW1lYW53Y25iYWZ1bmRlZmluZWQiOiJmNiJ9\">.f2{text-align:center}.f3{padding:24px}.f4{color:red}.f5{font-family:Merriweather}.f6{animation-name:anwcnbaf}</style><style id=\"__freyja_mediaqueries\"></style>')
  })
})
