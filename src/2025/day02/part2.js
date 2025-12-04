import fs from 'fs'
import { join, equals, pipe, map, flatten, sum, range, filter, repeat, any } from 'ramda'

export const inputStringToPairs = (s) => s.split(',')

export const pairStringToTuple = (s) => map((n) => Number.parseInt(n, 10), s.split('-'))

const data = fs.readFileSync('src/2025/day02/input2.txt', 'utf8')

export const invalidIDsInRange = ([min, max]) =>
  filter(
    (n) => {
      const s = `${n}`
      return any(
        pipe(
          //
          (sl) => repeat(s.slice(0, sl))(Math.max(2, s.length / sl)),
          join(''),
          equals(s)
        ),
        range(1, s.length / 2 + 1)
      )
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
