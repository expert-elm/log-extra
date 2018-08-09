/**
 * work with webpack-serve for browser
 *

 * @flow
 */

import log from './'
import WebSocket from 'isomorphic-ws'

const cache = []

export function createSocket(socket: string = 'ws://localhost:8081'): void {
  /**
   * check global socket was exists
   */
  if(global.LOGGER_SOCKET) {
    return
  }

  const ws = new WebSocket(socket)

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

  global.LOGGER_SOCKET = ws
}

function makeSend(level: string) {
  return function send(...args: Array<string>) {
    const ws = global.LOGGER_SOCKET

    /**
     * check global socket was exists
     */
    if(!ws) {
      throw new Error(
        `WebSocket not initial, should call "createSocket()" first`
      )
    }

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

    if(1 === ws.readyState) {
      thunk()
    } else {
      cache.push(thunk)
    }

    // log[level].apply(null, args)
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
