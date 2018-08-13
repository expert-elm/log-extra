/**
 * terminal client for nodejs
 *
 * @flow
 */

import chalk from 'chalk'
import startsCase from './starts-case'
import type { Provider, MetaData, Position } from './'

export default function handler({ level, color }: Provider = {},
                                { position }: MetaData = {},
                                name: string,
                                datetime: string,
                                action: string,
                                content: string): () => void {
  if(!Array.isArray(color) || 0 === color.length) {
    throw new Error(
      `Can't find provider color, the color should be \
[color1, color2, color3, ...and more optional colors]`
    )
  }

  const is_fatal = 'fatal' === level
  const colorfx = is_fatal
        ? chalk[`bg${startsCase(color[0])}`]
        : chalk[color[0]]

  const tpl = colorfx(makeTpl(level, name, datetime, action))

  return () => {
    const sp = content.split(/\r?\n/)
    const spliter = 1 === sp.length ? '-' : '|'
    sp.forEach(str => {
      if(!position) {
        console.log(tpl, spliter, str)
        return
      }

      console.log(tpl, makePositionTpl(position), spliter, str)
    })
  }
}

function makeTpl(level: string,
                 name: string,
                 datetime: string,
                 action: string): string {
  return `${chalk.bold(name.substr(0, 3).padStart(3, ' '))}| ${datetime} [${level.toUpperCase().padStart(5, ' ')}] <${chalk.bold(action)}>`
}

function makePositionTpl({ line, column, filename }: Position): string {
  return chalk.gray(`@ ${filename}:${line},${column}`)
}


/**
 * test
 */

import assert from 'assert'

describe('terminal client', function() {
  it('should apply position tpl', function() {
    assert(
      makePositionTpl({ line: '1', column: '2', filename: 'foo' }),
      chalk.gray(`@ foo:1,2`)
    )
  })

  it('should apply tpl', function() {
    assert(
      makeTpl('foo', 'bar', 'baz', 'qux'),
      `${chalk.bold('bar')}| baz [  FOO] <${chalk.bold('qux')}>`
    )
  })

  it('should apply tpl with name and level', function() {
    assert(
      makeTpl('foo', 'ba', 'baz', 'qux'),
      `${chalk.bold(' ba')}| baz [  FOO] <${chalk.bold('qux')}>`
    )
  })

  it('should apply tpl slice name and level', function() {
    assert(
      makeTpl('foooo', 'barr', 'baz', 'qux'),
      `${chalk.bold('bar')}| baz [FOOOO] <${chalk.bold('qux')}>`
    )
  })

  it('should throw when color not given', function() {
    assert.throws(
      () => {
        handler({ level: 'debug', color: [], weight: 42 }, {}, '', '', '', '')
      },
      // $FlowFixMe
      {
        name: 'Error',
        message: `\
Can't find provider color, the color should be \
[color1, color2, color3, ...and more optional colors]`
      }
    )
  })
})
