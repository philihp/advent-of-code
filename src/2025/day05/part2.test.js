import { intoDiscreteRange } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('intoDiscreteRange', () => {
  it('adds a range to an empty set of ranges', () => {
    const actual = intoDiscreteRange([], [6, 7])
    assert.deepEqual(actual, [[6, 7]])
  })
  it('adds a range that does not overlap', () => {
    const actual = intoDiscreteRange(
      [
        [1, 2],
        [10, 12],
      ],
      [6, 7]
    )
    assert.deepEqual(actual, [
      [1, 2],
      [10, 12],
      [6, 7],
    ])
  })
  it('combines two adjacent ranges', () => {
    const actual = intoDiscreteRange(
      [
        [1, 2],
        [10, 12],
      ],
      [12, 15]
    )
    assert.deepEqual(actual, [
      [1, 2],
      [10, 15],
    ])
  })
  it('combines two overlapping ranges', () => {
    const actual = intoDiscreteRange(
      [
        [1, 2],
        [10, 12],
        [18, 21],
      ],
      [8, 11]
    )
    assert.deepEqual(actual, [
      [1, 2],
      [18, 21],
      [8, 12],
    ])
  })
  it('combines adjacent ranges', () => {
    const actual = intoDiscreteRange([[1, 4]], [5, 8])
    assert.deepEqual(actual, [[1, 8]])
  })
  it('combines ranges that fill gaps', () => {
    const actual = intoDiscreteRange(
      [
        [3, 5],
        [9, 11],
      ],
      [6, 8]
    )
    assert.deepEqual(actual, [[3, 11]])
  })
})
