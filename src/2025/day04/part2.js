import fs from 'fs'
import { join, count, equals, concat, addIndex, pipe, map, split, slice, max, flatten, sum, range, filter } from 'ramda'

const data = fs.readFileSync('src/2025/day04/input2.txt', 'utf8')

export const maxPair = (s) => {
  const subArr = slice(0, s.length - 1, s)
  const maxSub = Math.max(...subArr)
  const maxLoc = subArr.indexOf(maxSub)
  const aftMax = slice(maxLoc + 1, s.length, s)
  const maxTwo = Math.max(...aftMax)
  const maxPar = 10 * maxSub + maxTwo
  return maxPar
}

const f0 = pipe(
  //
  split('\n'),
  map(split(''))
)(data)

const imap = addIndex(map)

const clearAccessible = imap((row, rIdx, floor) => {
  const maxRow = floor.length
  const maxCol = row.length
  return imap((cell, cIdx, row) => {
    if (cell === '.') return '.'
    if (cell === 'x') return '.'
    if (cell === '@') {
      const occupied = (rIdx, cIdx) => {
        if (rIdx < 0) return false
        if (cIdx < 0) return false
        if (rIdx >= maxRow) return false
        if (cIdx >= maxCol) return false
        const peer = floor[rIdx][cIdx]
        return peer === '@'
      }
      const directions = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ]
      const liberties = sum(
        map(([rMod, cMod]) => {
          return occupied(rIdx + rMod, cIdx + cMod) ? 1 : 0
        }, directions)
      )
      const canBeRemoved = liberties < 4 && cell === '@'
      return canBeRemoved ? 'x' : '@'
    }
  })(row)
})

const countRemoved = (floor) => count(equals('x'), flatten(floor))

let n = 0
let f = f0

let accum = 0
while (n++ < 150) {
  console.log({ n })
  const newF = clearAccessible(f)
  const removed = countRemoved(newF)
  if (removed === 0) break
  accum += countRemoved(newF)
  console.log({ removed })
  f = newF
  // map((row) => {
  //   console.log(join(' ')(row))
  // }, f)
}

console.log({ accum })
