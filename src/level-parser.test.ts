import parse from './level-parser'

test('number', () => {
  expect(
    parse(`42`)
  ).toBe(
    42
  )
})

test('string', () => {
  expect(
    parse(`info`)
  ).toBe(
    60
  )
})

test('provider string upper cased', () => {
  expect(
    parse(`INFO`)
  ).toBe(
    60
  )
})

test('provider string invalid', () => {
  expect(
    () => parse(`foo`)
  ).toThrowError(`Given LOGGER_LEVEL was invaild, foo`)
})
