import {extractCritical} from 'emotion-server'

const dehydrateCSS = (html = '') => {
  const {css, ids} = extractCritical(html)
  return `<style data-emotion-css="${ids.join(' ')}">${css}</style>`
}

export default dehydrateCSS
