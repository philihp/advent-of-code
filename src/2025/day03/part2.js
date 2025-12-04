import fs from 'fs'
import { pipe, map, split, slice, flatten, sum } from 'ramda'

const data = fs.readFileSync('src/2025/day03/input2.txt', 'utf8')

export const maxJoltWithBatteries = (n) => (s) => {
  if (n === 1) return `${Math.max(...s)}`
  if (n < 0) return ''
  if (s.length === 0) return ''
  const subArr = slice(0, s.length - n + 1, s)
  const maxSub = Math.max(...subArr)
  const maxLoc = subArr.indexOf(maxSub)
  const aftMax = slice(maxLoc + 1, s.length, s)
  const suffix = maxJoltWithBatteries(n - 1)(aftMax)
  return `${maxSub}${suffix}`
}

pipe(
  //
  split('\n'),
  map(split('')),
  map(map((s) => Number.parseInt(s, 10))),
  map((row) => Number.parseInt(maxJoltWithBatteries(12)(row), 10)),
  flatten,
  sum,
  console.log
)(data)