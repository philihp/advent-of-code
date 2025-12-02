import { inputStringToPairs, pairStringToTuple, invalidIDsInRange } from './part1.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('pairStringToTuple', () => {
  it('splits min/max pairs with dash', () => {
    const ranges = pairStringToTuple('11-22')
    assert.equal(ranges.length, 2)
    assert.equal(ranges[0], 11)
    assert.equal(ranges[1], 22)
  })
})

describe('inputStringToPairs', () => {
  it('splits strings up with comma', () => {
    const ranges = inputStringToPairs('1-2,3-4,5-6')
    assert.equal(ranges.length, 3)
    assert.equal(ranges[0], '1-2')
    assert.equal(ranges[1], '3-4')
    assert.equal(ranges[2], '5-6')
  })
})

describe('invalidIDsInRange', () => {
  it('gives the inclusive list of IDs for 11-22', () => {
    const ids = invalidIDsInRange([11, 22])
    assert.deepEqual(ids, [11, 22])
  })
  it('gives the inclusive list of IDs for 10-22', () => {
    const ids = invalidIDsInRange([10, 22])
    assert.deepEqual(ids, [11, 22])
  })
  it('gives the inclusive list of IDs for 11-23', () => {
    const ids = invalidIDsInRange([11, 23])
    assert.deepEqual(ids, [11, 22])
  })
  it('gives all two digits', () => {
    const ids = invalidIDsInRange([0, 100])
    assert.deepEqual(ids, [11, 22, 33, 44, 55, 66, 77, 88, 99])
  })
  it('gives nothing for 38593856-38593862', () => {
    const ids = invalidIDsInRange([38593856, 38593862])
    assert.deepEqual(ids, [38593859])
  })
})
