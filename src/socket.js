/**
 * work with webpack-serve for browser
 *

 * @flow
 */

import log from './'
import WebSocket from 'isomorphic-ws'

const cache = []

type Options = {
  socket?: string
}

export function createSocket({ socket = 'ws://localhost:8081' }: Options = {}): void {
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

    const { level, metadata, args } = data.data

    log[level].apply(metadata, args)
  })

  ws.addEventListener('open', function(evt) {
    cache.forEach(thunk => thunk(ws))
  })

  global.LOGGER_SOCKET = ws
}

function makeSend(level: string) {
  return function send(...args: Array<string>) {
    const ws = global.LOGGER_SOCKET
    const metadata = this || {}

    const thunk = ws => {
      ws.send(JSON.stringify({
        type: 'broadcast',
        data: {
          type: 'logger',
          data: {
            level,
            metadata,
            args
          }
        }
      }))
    }

    if(ws && 1 === ws.readyState) {
      thunk(ws)
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
