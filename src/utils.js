const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
const hasWindow = _ => typeof window !== 'undefined'
const hasDocument = _ => typeof document !== 'undefined'
export const isBrowser = (_ => !isNode && hasWindow() && hasDocument() && document.nodeType === 9)()

export const isMediaQuery = (key = '') => key[0] === '@' && key[1] === 'm'

export const mutMap = (fn, arr) => {
  arr.forEach((v, i) => (arr[i] = fn(v, i)))
  return arr
}
