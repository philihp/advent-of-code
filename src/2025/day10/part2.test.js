import { applyButton, fewestSteps } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('applyButton', () => {
  it("subtracts a binary bit's spot", () => {
    const goal = [3, 3, 3, 3]
    const button = 2
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [3, 3, 2, 3])
  })
  it('can change two bits', () => {
    const goal = [3, 3, 3, 3]
    const button = 6
    const actual = applyButton(goal, button)
    assert.deepEqual(actual, [3, 2, 2, 3])
  })
})

describe('fewestSteps', () => {
  // it('does not try to press buttons if at zero state', () => {
  //   const goal = [0, 0, 0, 0]
  //   const buttons = [1, 2, 3]
  //   const actual = fewestSteps([goal, buttons], 5)
  //   assert.equal(actual, 5)
  // })
  // it('bails with Infinity if goal exceeded', () => {
  //   const goal = [0, 0, -3, 0]
  //   const buttons = [1, 2, 3]
  //   const actual = fewestSteps([goal, buttons], 5)
  //   assert.equal(actual, Infinity)
  // })
  // it('can press one button', () => {
  //   const goal = [0, 0, 1, 1]
  //   const buttons = [1, 2, 3]
  //   const actual = fewestSteps([goal, buttons])
  //   assert.equal(actual, 1)
  // })
  // it('can press multiple buttons', () => {
  //   const goal = [0, 0, 1, 3]
  //   const buttons = [1, 2, 3]
  //   const actual = fewestSteps([goal, buttons])
  //   assert.equal(actual, 3)
  // })
  // it('does not fail on an impossible task', () => {
  //   const goal = [0, 1, 1, 3]
  //   const buttons = [1, 2, 3]
  //   const actual = fewestSteps([goal, buttons])
  //   assert.equal(actual, Infinity)
  // })

  it('can do the sample task', () => {
    const goal = [3, 5, 4, 7]
    const buttons = [1, 5, 2, 3, 10, 12]
    const actual = fewestSteps([goal, buttons])
    assert.equal(actual, Infinity)
  })
})
