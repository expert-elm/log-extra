/**
 * starts case
 *
 * @flow
 */

export default function startsCase(string: string): string {
  return string.replace(/^([^])/, (_, a) => a.toUpperCase())
}

/**
 * test
 */

import assert from 'assert'

describe('startCase', function() {
  it('should start case', function() {
    assert('Foo' === startsCase('foo'))
  })

  it('should ignore start by number', function() {
    assert('123' === startsCase('123'))
  })
})
