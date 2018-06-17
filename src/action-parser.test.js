/**
 * @jest
 */

import parse from './action-parser'

test('should match action string', () => {
  expect(
    parse('[foo]bar')
  ).toEqual(
    'foo'
  )
})

test('should match failed', () => {
  expect(
    parse('foo')
  ).toEqual(
    ''
  )
})

test('should match success only action', () => {
  expect(
    parse('[foo]')
  ).toEqual(
    'foo'
  )
})

test('should convert input to string first', () => {
  expect(
    parse(42)
  ).toEqual(
    ''
  )
})

test('should convert input to string for error', () => {
  expect(
    parse(new Error('[foo]bar'))
  ).toEqual(
    'foo'
  )
})
