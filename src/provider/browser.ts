import { Level } from '../level'
import { HandlerOptions, MetaData } from "../logger"

export default function handler(options: HandlerOptions, ...message: any[]): void {
  const { metadata, level, name, datetime, action, writter } = options
  const colorful = mapLevelToColor(level)
  const [ header, style ] = render(level, name, datetime, action)
  const styles: string[] = style.map(([css, clear]) => ([ colorful + css, clear ])).flat()
  const sp = message.map(msg => String(msg)).join(' ').split(/\r?\n/)
  const spliter: string = 1 === sp.length ? '-' : '|'

  sp.forEach(str => {
    if(!metadata) {
      writter.apply(writter, [ [header, spliter, str].join(' '), ...styles ])
    } else {
      const [ position, positionStyles ] = renderPosition(metadata)
      writter.apply(writter, [ [header, position, spliter, str].join(' '), ...styles, ...positionStyles] as any)
    }
  })
}

export function render(level: Level, name: string, datetime: Date, action: string): [string, [string, string][]] {
  return [
    [
      `%c` + renderName(name) + `%c`,
      `%c ` + renderDatetime(datetime),
      renderLevel(level) + ` %c`,
      `%c` + renderAction(action) + `%c`
    ].join(''),
    [
      [`font-weight:bolder;`, ''],
      [``, ``],
      [`font-weight:bolder;`, '']
    ]
  ]
}

function renderName(name: string): string {
  return `${name.substring(0, 3).padStart(3, ' ')}|`
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

function mapLevelToColor(level: Level): string {
  switch(level) {
    case Level.Fatal: return `background-color:red;`
    case Level.Error: return `color:red;`
    case Level.Warning: return `color:darkorange;`
    case Level.Info: return `color:darkblue;`
    case Level.Debug: return `color:darkmagenta;`
    case Level.Trace: return `color:gray;`
  }
}

function renderAction(action: string): string {
  return `<${action}>`
}

function renderPosition({ filename, line, column }: MetaData): [string, string[]] {
  return [
    `%c@ "file:///${filename.replace(/\\/g, '/').replace(/(\w):/, (_, a) => a.toUpperCase() + ':')}:${line}:${column}"%c`,
    [
      'color:gray;', ''
    ]
  ]
}
