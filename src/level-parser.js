/**
 * map level name to weight
 *
 * @flow
 */

import providers from './default-provider.js'

export default function parse(input: ?(string | number)): number | void {
  if(!input) {
    return undefined
  }

  /**
   * just call parseInt when input was a number
   */
  const num = parseInt(input)
  if(num) {
    return num
  }

  /**
   * assert given string is that was default provider
   */
  const str = input.toString().trim().toLowerCase()
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


/**
 * test
 */

import assert from 'assert'

describe('should parse logger level from env', () => {
  it('allow undefined', () => {
    assert(undefined === parse())
  })

  it('allow number', () => {
    assert(42 === parse('42'))
  })

  it('provider string', () => {
    assert(60 === parse('info'))
  })

  it('provider string upper cased', () => {
    assert(60 === parse('INFO'))
  })

  it('provider string invalid', () => {
    assert.throws(
      () => parse('foo'),
      // $FlowFixMe
      {
        name: 'Error',
        message: 'Given LOGGER_LEVEL was invaild, foo'
      }
    )
  })
})
