/**
 * logger
 *
 * A logger tool
 *
 * Logger format:
 *
 * ```
 *   Name| DateTime [Level] <Action> - Contents
 * ```
 *
 * Logger status:
 *
 * ```
 *   info, done, fail, warn
 * ```
 *
 * @evn LOGGER_ENV
 * @env LOGGER_APPLYCONSOLE
 * @env LOGGER_MOMENTFORMAT
 * @env LOGGER_FORMAT
 *
 * @flow
 */

import chalk from 'chalk'
import fmt from './datetime-formater'
import pvd from './default-provider'
import parse from './level-parser'
import parseStack from './stack-parser'

export type Provider = {
  level: string,
  weight: number,
  color: [string, string]
}

export type Handler = (Provider, string, string, string, string) => () => void

type Options = {
  provider: Provider,
  level: number,
  handler: Handler
}

export function createLogger({ provider, level, handler }: Options) {
  return function log(name: string, action: string, content: string): void {
    if(provider.weight > level) {
      return
    }
    const datetime = fmt(new Date())
    const stack = parseStack(new Error().stack)
    console.log(stack)
    handler(provider, name, datetime, action, String(content))()
  }
}

/**
 * export api
 */

const handler = 'undefined' === typeof window
      ? require('./terminal-client').default
      : require('./browser-client').default

const level = parse(process.env.LOGGER_LEVEL) || pvd.info.weight

export const trace = createLogger({ handler, level, provider: pvd.trace })
export const debug = createLogger({ handler, level, provider: pvd.debug })
export const info  = createLogger({ handler, level, provider: pvd.info })
export const warn  = createLogger({ handler, level, provider: pvd.warn })
export const error = createLogger({ handler, level, provider: pvd.error })
export const fatal = createLogger({ handler, level, provider: pvd.fatal })

export default {
  trace,
  debug,
  info,
  warn,
  error,
  fatal
}


/**
 * test
 */

import assert from 'assert'
import fs from 'fs'
import puppeteer from 'puppeteer'

describe('browser test', function() {
  const script = fs.readFileSync('./index.js', 'utf-8')
  it('page', function(done) {
    browserConsoleOutput({
      requires: [
        'process = {};process.env = {};',
        script
      ],
      script: 'Logger.info("foo", "bar", "baz")'
    }).catch(done).then(res => {
      console.log(res)
      assert(res)
      done()
    })
  })
})

function browserConsoleOutput({ requires = [], script = '' }) {
  return new Promise((res, rej) => {
    puppeteer.launch().then(browser => {
      browser.newPage().then(page => {
        page.evaluate(requires.join(';;')).then(() => {
          page.once('console', msg => {
            Promise.all(msg.args().map(arg => arg.jsonValue())).then(args => {
              res(args)
            }).catch(rej)
          })
          page.evaluate(script).catch(rej)
        }).catch(rej)
      }).catch(rej)
    }).catch(rej)
  })
}
