/**
 * stack parser
 *
 * @flow
 */

import { SourceMapConsumer } from 'source-map'

export default function parse(stack: string): string {
  const sp = stack.split('\n')
  /**
   * the first line should be error type, so just remove it
   */
  sp.shift()

  const regex = /\s+at\s*([^]+)/
  const url_regexp = /^\(?:[a-z]+:\)?\/\//
  return sp.map(str => str.match(regex)[1])
  // consumer.originalPositionFor()
  sp.shift()

  const ma = sp.shift().match(regex)[1]

  if(ma) {
    return ma
  }
}
