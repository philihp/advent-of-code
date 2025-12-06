import { splitBy, convertTermsToNumbers, applyOpcode } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('splitBy', () => {
  it('splits nothing if delims is empty range', () => {
    const actual = splitBy([])([0, 1, 2, 3, 4, 5])
    assert.deepEqual(actual, [])
  })
  it('splits once if only one delim', () => {
    const actual = splitBy([2])([0, 1, 2, 3, 4, 5])
    assert.deepEqual(actual, [[0, 1]])
  })
  it('splits once if two delims, same size', () => {
    const actual = splitBy([2, 2])([0, 1, 2, 3, 4, 5])
    assert.deepEqual(actual, [
      [0, 1],
      [2, 3],
    ])
  })
  it('splits once if two delims, variable size', () => {
    const actual = splitBy([2, 3])([0, 1, 2, 3, 4, 5])
    assert.deepEqual(actual, [
      [0, 1],
      [2, 3, 4],
    ])
  })
  it('splits once if three delims, same size', () => {
    const actual = splitBy([2, 2, 2])([0, 1, 2, 3, 4, 5])
    assert.deepEqual(actual, [
      [0, 1],
      [2, 3],
      [4, 5],
    ])
  })
  it('splits once if three delims, same size', () => {
    const actual = splitBy([3, 2, 3])([0, 1, 2, 3, 4, 5, 6, 7, 8])
    assert.deepEqual(actual, [
      [0, 1, 2],
      [3, 4],
      [5, 6, 7],
    ])
  })
})

describe('convertTermsToNumbers', () => {
  it('works on numbers top-justified', () => {
    const actual = convertTermsToNumbers(['*', '111', ' 22', ' 3 '])
    assert.deepEqual(actual, ['*', 21, 321, 1])
  })
  it('works on numbers bottom-justified', () => {
    const actual = convertTermsToNumbers(['*', ' 1 ', ' 22', '333'])
    assert.deepEqual(actual, ['*', 32, 321, 3])
  })
  it('works on numbers middle-justified', () => {
    const actual = convertTermsToNumbers(['*', ' 1 ', '222', ' 33'])
    assert.deepEqual(actual, ['*', 32, 321, 2])
  })
  it('works with mixed justification', () => {
    const actual = convertTermsToNumbers(['*', '11 ', '222', ' 33'])
    assert.deepEqual(actual, ['*', 32, 321, 21])
  })
})

describe('applyOpcode', () => {
  it('multiplies', () => {
    const actual = applyOpcode(['*', 1, 2, 3, 4])
    assert.deepEqual(actual, 24)
  })
  it('adds', () => {
    const actual = applyOpcode(['+', 1, 2, 3, 4])
    assert.deepEqual(actual, 10)
  })
})
