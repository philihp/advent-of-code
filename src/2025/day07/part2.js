import fs from 'fs'
import { pipe, transpose, map, split, filter, reduce, aperture, sum } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const cardinal = (arr) => aperture(3, [undefined, ...arr, undefined])

const splitField = reduce(
  (oldField, newField) =>
    oldField === undefined
      ? newField
      : pipe(
          map(cardinal),
          transpose,
          map(([[a, b, c], [d, e, f]]) => {
            // this would have been cool with pattern matching
            const splitLeft = typeof a === 'number' && d === '^'
            const passDown = typeof b === 'number' && e === '.'
            const splitRight = typeof c === 'number' && f === '^'
            if (splitRight || splitLeft || passDown)
              return sum([splitLeft ? a : 0, passDown ? b : 0, splitRight ? c : 0])
            if (e === '^') return '^'
            if (b === 'S') return 1
            return e
          })
        )([oldField, newField]),
  undefined
)

pipe(
  //
  readData,
  split('\n'),
  splitField,
  filter((n) => typeof n === 'number'),
  sum,
  console.log
)('src/2025/day07/input1.txt')
