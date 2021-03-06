import React from 'react'
import {atob, btoa} from 'abab'
import {prefixProperty, prefixValue, cssPrefix} from './prefixer'
import {mutMap, isBrowser, isMediaQuery} from './utils'
import {unitlessProps} from './props'

const {entries} = Object

const injectSheet = (doc, id) => {
  const s = doc.createElement('style')
  s.id = id
  doc.head.appendChild(s)
  return s
}

const createSheet = (doc, id) => {
  const s = doc.getElementById(id) || injectSheet(doc, id)
  const {sheet} = s
  return rule => sheet.insertRule(rule, sheet.cssRules.length)
}

const noop = () => {}

const sheets = {
  keyframes: isBrowser ? createSheet(document, '__freyja_keyframes') : noop,
  classes: isBrowser ? createSheet(document, '__freyja_classes') : noop,
  mediaqueries: isBrowser ? createSheet(document, '__freyja_mediaqueries') : noop,
}

const rules = {
  keyframes: [],
  classes: [],
  mediaqueries: [],
}

let cache = {}
let ruleCount = 0
const prefix = 'f'
const insert = (rule, sheet) => {
  !isBrowser && rules[sheet].push(rule)
  sheets[sheet](rule)
  ruleCount++
}
const hyph = p => prefixProperty(p).replace(/[A-Z]|^ms|^webkit/g, '-$&').toLowerCase()
const px = (p, v) => typeof v !== 'number' ? prefixValue(p, v) : unitlessProps[p] ? v : `${v}px`
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const kf = (name, frames, pf) => `@${pf ? cssPrefix : ''}keyframes ${name} {${frames}}`
const rx = (cn, prop, val) => `.${cn}{${hyph(prop)}:${px(prop, val)}}`
const noAnd = s => s.replace(/&/g, '')

const hash = (str, prefix = 'an') => {
  let h = 5381
  let i = str.length
  while (i) h = (h * 33) ^ str.charCodeAt(--i)
  return prefix + (h >>> 0).toString(36)
}

export const animation = obj => {
  const name = hash(JSON.stringify(obj))
  if (cache[name]) return cache[name]
  const frames = mutMap(([frame, val]) =>
    `${frame} {${entries(val).reduce((acc, [p, v]) => `${acc}${hyph(p)}:${px(p, v)};`, '')}}`
  , entries(obj)).join(' ')
  insert(kf(name, frames, true), 'keyframes')
  insert(kf(name, frames), 'keyframes')
  return cache[name] = name
}

const css = (obj, child = '', media) =>
  mutMap(([key, val]) => {
    if (val === null || val === undefined) return ''
    if (typeof val === 'object') {
      const m2 = isMediaQuery(key) ? key : null
      const c2 = m2 ? child : child + key
      return css(val, c2, m2 || media)
    }
    const _key = key + val + child + media
    if (cache[_key]) return cache[_key]
    const sh = media ? 'mediaqueries' : 'classes'
    const className = prefix + ruleCount.toString(36)
    insert(mx(rx(className + noAnd(child), key, val), media), sh)
    return cache[_key] = className
  }, entries(obj)).filter(Boolean).join(' ')

const styleData = _ => [
  rules.keyframes.join(''),
  rules.classes.join(''),
  rules.mediaqueries.join(''),
  btoa(JSON.stringify(cache)),
  ruleCount
]

const reset = _ => {
  cache = {}
  for (const k in rules) rules[k] = []
  ruleCount = 0
}

export const styleTags = () => {
  const [keyframes, classes, mediaqueries, cache, rules] = styleData()
  reset()
  return `<style id="__freyja_keyframes">${keyframes}</style><style id="__freyja_classes" data-freyja-rules="${rules}" data-freyja-cache="${cache}">${classes}</style><style id="__freyja_mediaqueries">${mediaqueries}</style>`
}

export const StyleComponents = () => {
  const [keyframes, classes, mediaqueries, cache, rules] = styleData()
  reset()
  return (
    <>
      <style id='__freyja_keyframes' dangerouslySetInnerHTML={{__html: keyframes}} />
      <style id='__freyja_classes' data-freyja-rules={rules} data-freyja-cache={cache}  dangerouslySetInnerHTML={{__html: classes}} />
      <style id='__freyja_mediaqueries' dangerouslySetInnerHTML={{__html: mediaqueries}} />
    </>
  )
}

export const hydrate = _ => {
  if (!isBrowser) return
  const s = document.getElementById('__freyja_classes')
  if (!s.dataset.freyjaCache) return
  cache = JSON.parse(atob(s.dataset.freyjaCache)) || {}
  ruleCount = parseInt(s.dataset.freyjaRules)
}

export default css
