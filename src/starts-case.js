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
 *
 * @describe startsCase()
 */

import assert from 'assert'

function $test_should_start_case() {
  assert('Foo' === startsCase('foo'))
}

function $test_should_ignore_start_by_number() {
  assert('123' === startsCase('123'))
}
