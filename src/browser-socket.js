/**
 * work with webpack-serve for browser
 *
 * @flow
 */

import log from './'

const cache = []
const ws = new WebSocket(process.env.LOGGER_SOCKET || 'ws://localhost:8081')

ws.addEventListener('message', function(evt) {
  const data = JSON.parse(evt.data)
  if('logger' !== data.type) {
    return
  }

  const { level, args } = data.data

  log[level].apply(null, args)
})

ws.addEventListener('open', function(evt) {
  cache.forEach(thunk => thunk())
})

function makeSend(level) {
  return function send(...args) {
    const state = ws.readyState
    const thunk = () => {
      ws.send(JSON.stringify({
        type: 'broadcast',
        data: {
          type: 'logger',
          data: {
            level,
            args
          }
        }
      }))
    }
    if(1 === state) {
      thunk()
    } else {
      cache.push(thunk)
    }

    log[level].apply(null, args)
  }
}

export const trace = makeSend('trace')
export const debug = makeSend('debug')
export const info  = makeSend('info')
export const warn  = makeSend('warn')
export const error = makeSend('error')
export const fatal = makeSend('fatal')

export default {
  trace,
  debug,
  info,
  warn,
  error,
  fatal
}
