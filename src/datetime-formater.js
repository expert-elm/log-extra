/**
 * format datetime
 *
 * @flow
 */

export default function format(date: Date): string {
  const year = (date.getFullYear() % 100).toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = (date.getDate()).toString().padStart(2, '0')
  const hours = (date.getHours()).toString().padStart(2, '0')
  const minutes = (date.getMinutes()).toString().padStart(2, '0')
  const seconds = (date.getSeconds()).toString().padStart(2, '0')
  const millseconds = (date.getMilliseconds()).toString().padStart(3, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${millseconds}`
}

/**
 * test
 */
import assert from 'assert'

describe('datetime formatter', function() {
  it('should match format', function() {
    assert(/^\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}$/.test(format(new Date())))
  })
})
