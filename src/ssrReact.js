import React from 'react'
import {extractCritical} from 'emotion-server'

const dehydrateCSS = (html = '') => {
  const {css, ids} = extractCritical(html)
  return <style data-emotion-css={ids.join(' ')} dangerouslySetInnerHTML={{__html: css}} />
}

export default dehydrateCSS
