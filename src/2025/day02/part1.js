import fs from 'fs'
import { concat, pipe, map, flatten, sum, range, filter } from 'ramda'

const data = fs.readFileSync('src/2025/day02/input2.txt', 'utf8')

export const inputStringToPairs = (s) => s.split(',')

export const pairStringToTuple = (s) => map((n) => Number.parseInt(n, 10), s.split('-'))

export const invalidIDsInRange = ([min, max]) =>
  filter(
    (n) => {
      const s = `${n}`
      const h = s.slice(0, s.length / 2)
      return concat(h, h) === s
    },
    range(min, max + 1)
  )

pipe(
  //
  inputStringToPairs,
  map(pairStringToTuple),
  map(invalidIDsInRange),
  flatten,
  sum,
  console.log
)(data)
