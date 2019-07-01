const isNode = typeof module !== 'undefined' && (!self || self.module !== module)
export const hasWindow = _ => typeof window !== 'undefined'
export const hasDocument = _ => typeof document !== 'undefined'
export const isBrowser = (_ => !isNode && hasWindow() && hasDocument() && document.nodeType === 9)()

export const isMediaQuery = (key = '') => key[0] === '@' && key[1] === 'm'

export const find = (fn, arr = []) => {
  let i = -1, l = arr.length,
    result
  while (++i < l && !result) result = fn(arr[i])
  return result
}

export const push = (value, arr) => ((arr[arr.length++] = value), arr)

export const forEach = (fn, arr, filterFn = _ => true) => {
  let i = -1,
    l = arr.length
  while (++i < l) filterFn(arr[i], i) && fn(arr[i], i)
}

export const mutMap = (fn, arr) => {
  forEach((v, i) => (arr[i] = fn(v, i)), arr)
  return arr
}

export const reduce = (fn, acc, arr) => {
  let i = -1,
    l = arr.length
  while (++i < l) acc = fn(acc, arr[i], i)
  return acc
}

export const forEntries = (fn, obj, allKeys = true) => {
  let key
  for (key in obj) (allKeys || obj.hasOwnProperty(key)) && fn(key, obj[key])
}

export const entries = obj => {
  const result = []
  forEntries((k, v) => push([k, v], result), obj, false)
  return result
}
