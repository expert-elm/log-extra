/**
 * action parser
 *
 * @flow
 */

export const RE_Action = /^\[([^\]]+)\]/

export default function parse(input: any): string {
  const ma = String(input).match(RE_Action)
  return ma ? ma[1] : ''
}
