import { maxJoltWithBatteries } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('maxJoltWithBatteries', () => {
  it('can pick 2 out of an array', () => {
    const actual = maxJoltWithBatteries(2)([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1])
    assert.equal(actual, 98)
  })
})
