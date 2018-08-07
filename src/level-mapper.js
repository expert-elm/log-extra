/**
 * map level name to weight
 *
 * @flow
 */

import providers from './default-provider.js'

export default function mapLevelNameToWeight(input: ?(string | number)): number | void {
  if(!input) {
    return undefined
  }

  const num = parseInt(input)
  if(num) {
    return num
  }

  const str = input.toString().trim()
  for(let key in providers) {
    const item = providers[key]
    if(str === key) {
      return item.weight
    }
  }

  throw new Error(
    `Given LOGGER_LEVEL was invaild, ${str}`
  )
}
