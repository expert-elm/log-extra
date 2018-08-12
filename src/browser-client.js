/**
 * browser client
 *
 * @flow
 */

import startsCase from './starts-case'
import type { Provider } from './'

export default function handler({ level, color }: Provider,
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
  const tpl = makeTpl(level, style, name, datetime, action)

  return () => {
    const sp = content.split(/\r?\n/)
    const spliter = 1 === sp.length ? '-' : '|'
    sp.forEach(str => {
      console.log.apply(console, [
        ...tpl,
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
                 action: string): Array<string> {
  return [
    `%c${name.substr(0, 3).padStart(3, ' ')}|%c%c ${datetime} [${level.toUpperCase().padStart(5, ' ')}] %c%c<${action}>%c`,
    `${color};font-weight: bolder;`, '',
    `${color}`, '',
    `${color};font-weight: bolder;`, ''
  ]
}
