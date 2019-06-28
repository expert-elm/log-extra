export const enum Level {
  Fatal = 0,
  Error = 10,
  Warning = 20,
  Info = 30,
  Debug = 40,
  Trace = 50
}

export function getDefaultLevel(env?: { [key: string]: string | undefined }): Level {
  if(!env) return Level.Info

  if(env.LOGGER_LEVEL) {
    const parsed = parseLevel(env.LOGGER_LEVEL)
    if(parsed) return parsed
  }

  if(env.DEBUG) return Level.Debug

  const e = env.NODE_ENV

  if(`development` === e) return Level.Debug
  else if(`production` === e) return Level.Error

  return Level.Info
}

export function parseLevel(level: string): Level | null {
  switch(level.toLowerCase()) {
    case `fatal`: return Level.Fatal
    case `error`: return Level.Error
    case `warning`: return Level.Warning
    case `info`: return Level.Info
    case `debug`: return Level.Debug
    case `trace`: return Level.Trace
    default: return null
  }
}
