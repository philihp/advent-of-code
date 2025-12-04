import fs from 'fs'
import { concat, pipe, map, split, slice, max, flatten, sum, range, filter } from 'ramda'

const data = fs.readFileSync('src/2025/day03/input1.txt', 'utf8')

export const maxPair = (s) => {
  const subArr = slice(0, s.length - 1, s)
  const maxSub = Math.max(...subArr)
  const maxLoc = subArr.indexOf(maxSub)
  const aftMax = slice(maxLoc + 1, s.length, s)
  const maxTwo = Math.max(...aftMax)
  const maxPar = 10 * maxSub + maxTwo
  return maxPar
}

pipe(
  //
  split('\n'),
  map(split('')),
  map(map((s) => Number.parseInt(s, 10))),
  map(maxPair),
  flatten,
  sum,
  console.log
)(data)
