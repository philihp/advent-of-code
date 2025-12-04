import fs from 'fs'
import { concat, pipe, map, split, slice, max, flatten, sum, range, filter } from 'ramda'

const data = fs.readFileSync('src/2025/day03/input2.txt', 'utf8')

export const maxJoltWithBatteries = (n) => (s) => {
  if (n === 1) {
    return Math.max(...s)
  }
  const subArr = slice(0, s.length - 1, s)
  const maxSub = Math.max(...subArr)
  const maxLoc = subArr.indexOf(maxSub)
  const aftMax = slice(maxLoc + 1, s.length, s)
  return 10 * maxSub + maxJoltWithBatteries(n - 1)(aftMax)
}

pipe(
  //
  split('\n'),
  map(split('')),
  map(map((s) => Number.parseInt(s, 10))),
  map(maxJoltWithBatteries(2)),
  flatten,
  sum,
  console.log
)(data)
