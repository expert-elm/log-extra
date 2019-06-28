import { Level, getDefaultLevel } from "./level"

export type Options = {
  level?: Level,
  writter?: Console['log'],
  env?: { [key: string]: string | undefined }
}

export type HandlerOptions = {
  metadata?: any,
  level: Level,
  name: string,
  datetime: Date,
  action: string,
  writter: Console['log']
}

export interface Handler {
  (options: HandlerOptions, ...message: any[]): void
}

export type MetaData = {
  filename: string,
  line: number,
  column: number
}

function isMetaData(object: any): boolean {
  if(`object` !== typeof object || null === object) return false
  return object.filename && object.line && object.column
}

export interface Logger {
  (this: MetaData, name: string, action: string, ...message: any[]): void
  fatal(this: MetaData, name: string, action: string, ...message: any[]): void
  error(this: MetaData, name: string, action: string, ...message: any[]): void
  warn(this: MetaData, name: string, action: string, ...message: any[]): void
  info(this: MetaData, name: string, action: string, ...message: any[]): void
  debug(this: MetaData, name: string, action: string, ...message: any[]): void
  trace(this: MetaData, name: string, action: string, ...message: any[]): void
}

export default function createLogger(handler: Handler, options: Options = {}): Logger {
  const { env, level = getDefaultLevel(env), writter = console.log } = options

  function factory(loglevel: Level) {
    return function log(this: MetaData, name: string = '', action: string = '', ...message: any[]) {
      if(loglevel > level) {
        return
      }

      const datetime = new Date()
      const metadata = isMetaData(this) ? this : undefined

      handler({
        level: loglevel,
        metadata,
        name,
        datetime,
        action,
        writter
      }, ...message)
    }
  }

  const log = <Logger>factory(level)
  log.fatal = factory(Level.Fatal)
  log.error = factory(Level.Error)
  log.warn = factory(Level.Warning)
  log.info = factory(Level.Info)
  log.debug = factory(Level.Debug)
  log.trace = factory(Level.Trace)


  return log
}
