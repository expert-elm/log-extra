import providers from './default-provider.js'

export default function parse(input: string | number): number {
  if(`number` === typeof input) return input

  const num: number = parseInt(input)
  if(!isNaN(num)) return num

  const key = input.toString().trim().toLowerCase()
  const buildin = providers[key as keyof typeof providers]

  if(undefined === buildin) throw new Error(
    `Given LOGGER_LEVEL was invaild, ${key}`
  )

  return buildin.weight
}
