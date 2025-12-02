import { applyCommand } from './part2.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('applyCommand', () => {
  it('from start, left onto positive', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L43'
    )
    assert.equal(pointingAt, 7)
    assert.equal(password, 0)
  })
  it('from start, right but not far', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'R13'
    )
    assert.equal(pointingAt, 63)
    assert.equal(password, 0)
  })
  it('from start, left onto zero', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L50'
    )
    assert.equal(pointingAt, 0)
    assert.equal(password, 1)
  })
  it('from start, right onto zero', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'R50'
    )
    assert.equal(pointingAt, 0)
    assert.equal(password, 1)
  })
  it('from start, left around once and then onto zero', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L150'
    )
    assert.equal(pointingAt, 0)
    assert.equal(password, 2)
  })
  it('from start, right around once and then onto zero', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'R150'
    )
    assert.equal(pointingAt, 0)
    assert.equal(password, 2)
  })
  it('from start, left onto negative', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L81'
    )
    assert.equal(pointingAt, 69)
    assert.equal(password, 1)
  })
  it('from start, right past 0, wrap around', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'R81'
    )
    assert.equal(pointingAt, 31)
    assert.equal(password, 1)
  })
  it('from start, left twice onto negative and around', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L181'
    )
    assert.equal(pointingAt, 69)
    assert.equal(password, 2)
  })
  it('from start, right twice and wrap around', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'R181'
    )
    assert.equal(pointingAt, 31)
    assert.equal(password, 2)
  })
  it('from start, left thrice onto negative and around twice', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 50,
        password: 0,
      },
      'L281'
    )
    assert.equal(pointingAt, 69)
    assert.equal(password, 3)
  })

  it('if starting at zero dont count going left', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 0,
        password: 0,
      },
      'L67'
    )
    assert.equal(pointingAt, 33)
    assert.equal(password, 0)
  })
  it('if starting at zero dont count going right', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 0,
        password: 0,
      },
      'R67'
    )
    assert.equal(pointingAt, 67)
    assert.equal(password, 0)
  })
  it('if starting at zero dont count going left but still count wrapping around', () => {
    const { pointingAt, password } = applyCommand(
      {
        pointingAt: 0,
        password: 0,
      },
      'L167'
    )
    assert.equal(pointingAt, 33)
    assert.equal(password, 1)
  })
})
