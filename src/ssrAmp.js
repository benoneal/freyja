import {extractCritical} from 'emotion-server'

const dehydrateCSS = (html = '') => extractCritical(html).css

export default dehydrateCSS
