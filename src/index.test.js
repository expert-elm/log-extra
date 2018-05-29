/**
 * @jest
 */

import _log, {
  log,
  tlog,
  ok,
  tok,
  error,
  mapStatusToColor as mapsc,
  mapStatusToConsoleMethod as mapscm
} from './'

test('should run with log options', () => {
  process.env.LOGGER_ENV = 'terminal'
  expect(
    _log(['foo'], 'bar')
  ).toEqual(
    'foo'
  )
})

test('should map status to color', () => {
  expect(
    mapsc('info')
  ).toEqual(
    'blue'
  )

  expect(
    mapsc('done')
  ).toEqual(
    'green'
  )

  expect(
    mapsc('fail')
  ).toEqual(
    'red'
  )

  expect(
    mapsc('warn')
  ).toEqual(
    'yellow'
  )

  expect(
    () => mapsc('foo')
  ).toThrow()
})

test('should map status to console methods', () => {
  expect(
    mapscm('info')
  ).toEqual(
    console.log
  )

  expect(
    mapscm('done')
  ).toEqual(
    console.log
  )

  expect(
    mapscm('fail')
  ).toEqual(
    console.error
  )

  expect(
    mapscm('warn')
  ).toEqual(
    console.warn
  )

  expect(
    mapscm('foo')
  ).toEqual(
    console.log
  )
})



test('should return from log for terminal env', () => {
  process.env.LOGGER_ENV = 'terminal'
  expect(
    log('foo')
  ).toEqual(
    'foo'
  )

  expect(
    error('[foo]bar')
  ).toEqual(
    'bar'
  )

  expect(
    log('[foo]', 'bar')
  ).toEqual(
    'bar'
  )

  expect(
    log('foo', 'bar')
  ).toEqual(
    'foo'
  )

  expect(
    tlog('foo')()
  ).toEqual(
    undefined
  )

  expect(
    tlog('foo')('bar')
  ).toEqual(
    'bar'
  )

  expect(
    tlog('foo', 'bar')('')
  ).toEqual(
    ''
  )

  expect(
    tlog('foo', 'bar')()
  ).toEqual(
    undefined
  )

  expect(
    tlog('foo', 'bar')('baz')
  ).toEqual(
    'baz'
  )
})

test('should return from log for browser env', () => {
  process.env.LOGGER_ENV = 'browser'
  expect(
    log('foo')
  ).toEqual(
    'foo'
  )

  expect(
    error('[foo]bar')
  ).toEqual(
    'bar'
  )

  expect(
    log('[foo]', 'bar')
  ).toEqual(
    'bar'
  )

  expect(
    log('foo', 'bar')
  ).toEqual(
    'foo'
  )

  expect(
    tlog('foo')()
  ).toEqual(
    undefined
  )

  expect(
    tlog('foo')('bar')
  ).toEqual(
    'bar'
  )

  expect(
    tlog('foo', 'bar')('')
  ).toEqual(
    ''
  )

  expect(
    tlog('foo', 'bar')()
  ).toEqual(
    undefined
  )

  expect(
    tlog('foo', 'bar')('baz')
  ).toEqual(
    'baz'
  )
})
