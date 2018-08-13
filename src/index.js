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

export type Provider = {
  level: string,
  weight: number,
  color: Array<string>
}

export type MetaData = {
  position?: Position
}

export type Position = {
  line: string,
  column: string,
  filename: string
}

export type Handler = (Provider, MetaData, string, string, string, string) => () => void

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

    /**
     * meta data
     */
    const metadata = this || {}
    handler(provider, metadata, name, datetime, action, String(content))()
  }
}

/**
 * export api
 */

const handler = 'undefined' === typeof window
      ? require('./terminal-client').default
      : require('./browser-client').default

const level = process.env.DEBUG
      ? pvd.debug.weight
      : (parse(process.env.LOGGER_LEVEL) || pvd.info.weight)

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
