/**
 * browser client
 *
 * @flow
 */

import startsCase from './starts-case'
import type { Provider, MetaData, Position } from './'

export default function handler({ level, color }: Provider,
                                { position }: MetaData,
                                name: string,
                                datetime: string,
                                action: string,
                                content: string): () => void {

  if(!Array.isArray(color) || 0 === color.length) {
    throw new Error(
      `Can't find provider color, the color should be \
[color1, color2, color3, ...and more optional colors]`
    )
  }

  const is_fatal = 'fatal' === level
  const style = is_fatal
        ? `background-color: ${color[1]};color: white;`
        : `color: ${color[1]}`
  const [ header, header_style ] = makeTpl(level, style, name, datetime, action)

  return () => {
    const sp = content.split(/\r?\n/)
    const spliter = 1 === sp.length ? '-' : '|'
    sp.forEach(str => {
      if(!position) {
        console.log.apply(console, [
          header,
          ...header_style,
          spliter,
          str
        ])

        return
      }

      const [ pos, pos_style ] = makePositionTpl(position)
      console.log.apply(console, [
        [header, pos].join(' '),
        ...header_style,
        ...pos_style,
        spliter,
        str
      ])
    })
  }
}

function makeTpl(level: string,
                 color: string,
                 name: string,
                 datetime: string,
                 action: string): [string, Array<string>] {
  return [
    `%c${name.substr(0, 3).padStart(3, ' ')}|%c%c ${datetime} [${level.toUpperCase().padStart(5, ' ')}] %c%c<${action}>%c`,
    [
      `${color};font-weight: bolder;`, '',
      `${color}`, '',
      `${color};font-weight: bolder;`, ''
    ]
  ]
}

function makePositionTpl({ line, column, filename }: Position): [string, Array<string>] {
  return [
    `%c@ "file:///${filename.replace(/\\/g, '/').replace(/(\w):/, (_, a) => a.toUpperCase() + ':')}:${line}:${column}"%c`,
    [
      'color: gray;', ''
    ]
  ]
}
