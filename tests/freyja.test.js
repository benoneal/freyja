import React from 'react'
import {renderToString} from 'react-dom/server'
import useStyles, {animation, styleTags, StyleComponents, ThemeProvider} from '../src'
import {media} from '../src/traits'

const testTheme = {
  font: {
    display: '"Zilla Slab", serif'
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
    padding: scale.large,
    [media.tablet]: {
      padding: scale.small
    }
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
    expect(subject()).toBe('<div class="f2 f3 f4"><h1 class="f5 f6 f7">My test title</h1></div>')
  })

  it('renders dehydrated CSS as style tag strings for SSR', () => {
    subject()
    expect(styleTags()).toBe('<style id=\"__freyja_keyframes\">@--keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}@keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}</style><style id=\"__freyja_classes\" data-freyja-rules=\"8\" data-freyja-cache=\"eyJhbndjbmJhZiI6ImFud2NuYmFmIiwidGV4dEFsaWduY2VudGVydW5kZWZpbmVkIjoiZjIiLCJwYWRkaW5nMjR1bmRlZmluZWQiOiJmMyIsInBhZGRpbmcxMkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU4MHB4KSI6ImY0IiwiY29sb3JyZWR1bmRlZmluZWQiOiJmNSIsImZvbnRGYW1pbHlcIlppbGxhIFNsYWJcIiwgc2VyaWZ1bmRlZmluZWQiOiJmNiIsImFuaW1hdGlvbk5hbWVhbndjbmJhZnVuZGVmaW5lZCI6ImY3In0=\">.f2{text-align:center}.f3{padding:24px}.f5{color:red}.f6{font-family:"Zilla Slab", serif}.f7{animation-name:anwcnbaf}</style><style id=\"__freyja_mediaqueries\">@media screen and (min-width: 580px){.f4{padding:12px}}</style>')
  })

  it('renders dehydrated CSS as react style components for SSR', () => {
    subject()
    expect(renderToString(<StyleComponents />)).toBe('<style id=\"__freyja_keyframes\">@--keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}@keyframes anwcnbaf {from {transform:rotate(0deg);} to {transform:rotate(360deg);}}</style><style id=\"__freyja_classes\" data-freyja-rules=\"8\" data-freyja-cache=\"eyJhbndjbmJhZiI6ImFud2NuYmFmIiwidGV4dEFsaWduY2VudGVydW5kZWZpbmVkIjoiZjIiLCJwYWRkaW5nMjR1bmRlZmluZWQiOiJmMyIsInBhZGRpbmcxMkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU4MHB4KSI6ImY0IiwiY29sb3JyZWR1bmRlZmluZWQiOiJmNSIsImZvbnRGYW1pbHlcIlppbGxhIFNsYWJcIiwgc2VyaWZ1bmRlZmluZWQiOiJmNiIsImFuaW1hdGlvbk5hbWVhbndjbmJhZnVuZGVmaW5lZCI6ImY3In0=\">.f2{text-align:center}.f3{padding:24px}.f5{color:red}.f6{font-family:"Zilla Slab", serif}.f7{animation-name:anwcnbaf}</style><style id=\"__freyja_mediaqueries\">@media screen and (min-width: 580px){.f4{padding:12px}}</style>')
  })
})
