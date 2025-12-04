import { invalidIDsInRange } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('invalidIDsInRange', () => {
  it('gives the inclusive list of IDs for 11-22', () => {
    const ids = invalidIDsInRange([11, 22])
    assert.deepEqual(ids, [11, 22])
  })
  it('does not pass for single digit numbers 1-9', () => {
    const ids = invalidIDsInRange([1, 9])
    assert.deepEqual(ids, [])
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
  it('gives 38593859 for 38593856-38593862', () => {
    const ids = invalidIDsInRange([38593856, 38593862])
    assert.deepEqual(ids, [38593859])
  })
  it('gives 123123123 for 123123120-123123190', () => {
    const ids = invalidIDsInRange([123123120, 123123190])
    assert.deepEqual(ids, [123123123])
  })
})
