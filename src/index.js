/**
 * logger
 *
 * A logger tool
 *
 * Logger format:
 *
 * ```
 *   [DATETIME] ACTION CONTENT
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

import moment from 'moment'

type Env =
  | 'terminal'
  | 'browser'

type Status =
  | 'info'
  | 'done'
  | 'fail'
  | 'warn'

type Options = {
  /**
   * properties
   */
  datetime?: ?(boolean | string),
  format?: string,
  applyConsole?: boolean,
  blue?: string,
  red?: string,
  yellow?: string,
  green?: string,

  /**
   * status
   */
  lazy?: boolean,
  status?: Status
}

const RE_Action = /^\[([^\]]+)\]/

export default function _log<T>(contents: Array<string>, action: string, options?: Options): (string | (T => T | string)) {
  const {
    datetime = process.env.LOGGER_MOMENTFORMAT || 'YYYY-MM-DD HH:mm:ss',
    format = process.env.LOGGER_FORMAT || '[{{DATETIME}}]{{ACTION}}',
    applyConsole = process.env.LOGGER_APPLYCONSOLE || true,
    blue = process.env.LOGGER_COLOR_BLUE || 'blue',
    red = process.env.LOGGER_COLOR_RED || 'red',
    green = process.env.LOGGER_COLOR_GREEN || 'green',
    yellow = process.env.LOGGER_COLOR_YELLOW || 'yellow',
    lazy = false,
    status = 'info'
  } = options || {}

  /**
   * supports colors
   */
  const colors = { blue, red, green, yellow }

  /**
   * match console methods
   */
  const logfx = applyConsole
        ? mapStatusToConsoleMethod(status)
        : console.log

  /**
   * match color
   */
  const colorfx = mapStatusToColor(status)

  /**
   * current datetime or timestamp
   */
  let now
  if('boolean' === typeof datetime) {
    now = Date.now()
  } else {
    now = moment().format(datetime)
  }

  /**
   * output
   */
  let thunk

  if('browser' !== process.env.LOGGER_ENV) {
    const chalk = require('chalk')

    const str = format
          .replace('{{DATETIME}}', chalk[colorfx + 'Bright'](now))
          .replace('{{ACTION}}', action ? ' ' + chalk.bold[colorfx](action) : '')

    thunk = () => logfx.apply(console, [str].concat(contents))
  } else {
    const str = format
          .replace('{{DATETIME}}', '%c' + now + '%c')
          .replace('{{ACTION}}', action ? ' ' + '%c' + action + '%c' : '')

    thunk = () => logfx.apply(console, [
      str,
      `color:${colors[colorfx]};`,
      `color:inherit;`,
      `color:${colors[colorfx]};font-weight:bold;`,
      `color:inherit;`
    ].concat(contents))
  }

  if(!lazy) {
    thunk()
    return contents[0]
  } else {
    return a => {
      thunk()
      return a
    }
  }
}

export function mapStatusToConsoleMethod(status: Status): Function {
  switch(status) {
    case 'fail':
      return console.error
    case 'warn':
      return console.warn
    default:
      return console.log
  }
}

export function mapStatusToColor(status: Status): string {
  switch(status) {
    case 'info':
      return 'blue'
    case 'done':
      return 'green'
    case 'fail':
      return 'red'
    case 'warn':
      return 'yellow'
    default:
      throw new Error(fail('[logger.internal]Unknow status:', status))
  }
}


export function wrap(status: Status, lazy: boolean = false): Function {
  return (...args) => {
    const action = !args.length ? '' : parseAction(args[0])

    /**
     * erasure action
     */
    if(action) {
      args[0] = args[0].replace(RE_Action, '')

      /**
       * shift blank string, match `console.log('[ACTION]', '...REST ARGUMNET')`
       */
      if('' === args[0]) {
        args.shift()
      }
    }

    return _log(args, action, {
      lazy,
      status
    })
  }
}

function parseAction(obj: any): string {
  if('string' !== typeof obj) {
    return ''
  }

  const matched = obj.match(RE_Action)

  if(!matched) {
    return ''
  }

  return matched[1]
}


/**
 * export alias
 */

/**
 * info
 */
export const info = wrap('info')
export const tinfo = wrap('info', true)
export const log = wrap('info')
export const tlog = wrap('info', true)

/**
 * done
 */
export const done = wrap('done')
export const tdone = wrap('done', true)
export const ok = wrap('done')
export const tok = wrap('done', true)
export const success = wrap('done')
export const tsuccess = wrap('done', true)

/**
 * fail or error
 */
export const fail = wrap('fail')
export const tfail = wrap('fail', true)
export const err = wrap('fail')
export const terr = wrap('fail', true)
export const error = wrap('fail')
export const terror = wrap('fail', true)

/**
 * warning
 */
export const warn = wrap('warn')
export const twarn = wrap('warn', true)
export const warning = wrap('warn')
export const twarning = wrap('warn', true)
