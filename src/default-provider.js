/**
 * build-in providers
 *
 * @flow
 */

export default {
  trace: {
    level: 'trace',
    weight: 100,
    color: ['gray', 'gray']
  },
  debug: {
    level: 'debug',
    weight: 80,
    color: ['magenta', 'darkmagenta']
  },
  info: {
    level: 'info',
    weight: 60,
    color: ['blueBright', 'darkblue']
  },
  warn: {
    level: 'warn',
    weight: 40,
    color: ['yellow', 'darkorange']
  },
  error: {
    level: 'error',
    weight: 20,
    color: ['red', 'red']
  },
  fatal: {
    level: 'fatal',
    weight: 0,
    color: ['red', 'red']
  }
}
