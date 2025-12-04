import fs from 'fs'
import { concat, addIndex, pipe, map, split, slice, max, flatten, sum, range, filter } from 'ramda'

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

const floor = pipe(
  //
  split('\n'),
  map(split(''))
)(data)

const imap = addIndex(map)

const maxRow = floor.length
const marked = imap((row, rIdx) => {
  const maxCol = row.length
  return imap((cell, cIdx) => {
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

    return liberties < 4 && cell === '@' ? 1 : 0
  })(row)
})(floor)

console.log(sum(flatten(marked)))
