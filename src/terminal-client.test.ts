import chalk from 'chalk'
import handler, { makePositionTpl, makeTpl } from './terminal-client'

describe('terminal client', function() {
  it('should apply position tpl', function() {
    expect(
      makePositionTpl({ line: '1', column: '2', filename: 'foo' })
    ).toBe(
      chalk.gray(`@ foo:1,2`)
    )
  })

  it('should apply tpl', function() {
    expect(
      makeTpl('foo', 'bar', 'baz', 'qux')
    ).toBe(
      `${chalk.bold('bar')}| baz [  FOO] <${chalk.bold('qux')}>`
    )
  })

  it('should apply tpl with name and level', function() {
    expect(
      makeTpl('foo', 'ba', 'baz', 'qux')
    ).toBe(
      `${chalk.bold(' ba')}| baz [  FOO] <${chalk.bold('qux')}>`
    )
  })

  it('should apply tpl slice name and level', function() {
    expect(
      makeTpl('foooo', 'barr', 'baz', 'qux')
    ).toBe(
      `${chalk.bold('bar')}| baz [FOOOO] <${chalk.bold('qux')}>`
    )
  })

  it('should throw when color not given', function() {
    expect(
      () => {
        handler({ level: 'debug', color: [], weight: 42 }, {}, '', '', '', '')
      }
    ).toThrowError(`\
Can't find provider color, the color should be \
[color1, color2, color3, ...and more optional colors]`
    )
  })
})
