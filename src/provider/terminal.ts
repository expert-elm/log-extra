import chalk, { Chalk } from "chalk"
import { Level } from '../level'
import { HandlerOptions, MetaData } from "../logger"

export default function handler(options: HandlerOptions, ...message: any[]): void {
  const { metadata, level, name, datetime, action, writter } = options
  const colorful = mapLevelToColor(level)
  const header: string = colorful(render(level, name, datetime, action))

  const sp = message.map(msg => String(msg)).join(' ').split(/\r?\n/)
  const spliter: string = 1 === sp.length ? '-' : '|'

  sp.forEach(str => {
    if(!metadata) {
      writter(header, spliter, str)
    } else {
      writter(header, renderPosition(metadata), spliter, str)
    }
  })
}

export function render(level: Level, name: string, datetime: Date, action: string): string {
  return [
    renderName(name),
    renderDatetime(datetime),
    renderLevel(level),
    renderAction(action)
  ].join(' ')
}

function renderName(name: string): string {
  return `${chalk.bold(name.substring(0, 3).padStart(3, ' '))}|`
}

function renderLevel(level: Level): string {
  return `[${mapLevelToString(level).toUpperCase().padStart(5, ' ')}]`
}

function renderDatetime(date: Date): string {
  return date.toLocaleTimeString()
}

function mapLevelToString(level: Level): string {
  switch(level) {
    case Level.Fatal: return `fatal`
    case Level.Error: return `error`
    case Level.Warning: return `warn`
    case Level.Info: return `info`
    case Level.Debug: return `debug`
    case Level.Trace: return `trace`
  }
}

function mapLevelToColor(level: Level): Chalk['bgRed'] | Chalk['red'] | Chalk['yellow'] | Chalk['blueBright'] | Chalk['magenta'] | Chalk['gray'] {
  switch(level) {
    case Level.Fatal: return chalk.bgRed
    case Level.Error: return chalk.red
    case Level.Warning: return chalk.yellow
    case Level.Info: return chalk.blueBright
    case Level.Debug: return chalk.magenta
    case Level.Trace: return chalk.gray
  }
}

function renderAction(action: string): string {
  return `<${chalk.bold(action)}>`
}

function renderPosition({ filename, line, column }: MetaData): string {
  return chalk.gray(`@ ${filename.toString()}:${line.toString()},${column.toString()}`)
}
