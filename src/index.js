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

type Provider = {
  level: 'string',
  weight: number,
  color: [string, string]
}

type Options = {
  provider: Provider,
  level: number,
  handler: (string, string, string) => () => void
}

export function createLogger({ provider, level, handler }: Options) {
  if(provider.weight > level) {
    return undefined
  }

  return function log(name: string, action: string, content: string): void {
    const datetime = fmt(new Date())
    handler(provider, name, datetime, action, content)()
  }
}

/**
 * export api
 */

const handler = 'undefined' === typeof window
      ? require('./terminal-client').default
      : require('./browser-client').default

const level = pvd.info.weight

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
