import { decAt, applyButton } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('decAt', () => {
  it('subtracts 0 from an array', () => {
    const arr = [6, 7, 8, 9]
    const actual = decAt(arr, 0)
    assert.deepEqual(actual, [5, 7, 8, 9])
  })
  it('subtracts 1 from an array', () => {
    const arr = [6, 7, 8, 9]
    const actual = decAt(arr, 1)
    assert.deepEqual(actual, [6, 6, 8, 9])
  })
  it('subtracts 2 from an array', () => {
    const arr = [6, 7, 8, 9]
    const actual = decAt(arr, 2)
    assert.deepEqual(actual, [6, 7, 7, 9])
  })
  it('subtracts 3 from an array', () => {
    const arr = [6, 7, 8, 9]
    const actual = decAt(arr, 3)
    assert.deepEqual(actual, [6, 7, 8, 8])
  })
  it('subtracts outside of the array', () => {
    const arr = [6, 7, 8, 9]
    const actual = decAt(arr, 4)
    assert.deepEqual(actual, arr) // no change
  })
})

describe('applyButton', () => {
  it("subtracts a binary bit's spot", () => {
    const goal = [3, 3, 3, 3]
    const button = [2]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [3, 3, 2, 3])
  })
  it('can change two bits', () => {
    const goal = [3, 3, 3, 3]
    const button = [1, 2]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [3, 2, 2, 3])
  })
  it('works on an empty string', () => {
    const goal = []
    const button = []
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [])
  })
  it('works on a 1 digit string', () => {
    const goal = [5]
    const button = [0]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [4])
  })
  it('can go negative', () => {
    const goal = [0]
    const button = [0]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [-1])
  })
  it('can go negative on one and zero on another', () => {
    const goal = [0, 1]
    const button = [0, 1]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [-1, 0])
  })
  it('can go negative on two', () => {
    const goal = [0, 0]
    const button = [0, 1]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [-1, -1])
  })
  it('can go to 0', () => {
    const goal = [1]
    const button = [0]
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [0])
  })
})
