import { maxJoltWithBatteries } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('maxJoltWithBatteries', () => {
  it('can pick 1 out of an array', () => {
    const actual = maxJoltWithBatteries(1)([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1])
    assert.equal(actual, '9')
  })
  it('can pick 2 out of an array', () => {
    const actual = maxJoltWithBatteries(2)([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1])
    assert.equal(actual, '98')
  })
  it('can pick 3 out of an array', () => {
    const actual = maxJoltWithBatteries(3)([1, 9, 8, 7, 6])
    assert.equal(actual, '987')
  })
  it('can pick first 4 out of an array', () => {
    const actual = maxJoltWithBatteries(4)([9, 9, 8, 1, 1, 1, 1, 1, 1, 1])
    assert.equal(actual, '9981')
  })
  it('can pick last 4 out of an array', () => {
    const actual = maxJoltWithBatteries(4)([1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9])
    assert.equal(actual, '9999')
  })
  it('can pick from edges', () => {
    const actual = maxJoltWithBatteries(7)([9, 8, 7, 6, 5, 6, 7, 8, 9])
    assert.equal(actual, '9876789')
  })
  it('can pick out from middle', () => {
    const actual = maxJoltWithBatteries(7)([5, 6, 7, 8, 9, 8, 7, 6, 5])
    assert.equal(actual, '7898765')
  })
})
