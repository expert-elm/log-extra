import createLogger from './logger'
import handler from './provider/browser'
export default createLogger(handler)
export { default as createLogger, Handler, HandlerOptions, Options, MetaData } from './logger'
export { Level, parseLevel } from './level'
