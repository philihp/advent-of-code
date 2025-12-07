import fs from 'fs'
import { pipe, add, transpose, map, split, reduce, aperture, count } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const isSplit = ([o, n]) => o === '|' && n === '^'

const cardinal = (arr) => aperture(3, [undefined, ...arr, undefined])

const splitField = ([splits, oldField], newField) =>
  oldField === undefined
    ? [splits, newField]
    : [
        pipe(
          //
          transpose,
          count(isSplit),
          add(splits)
        )([oldField, newField]),
        pipe(
          map(cardinal),
          transpose,
          map(([[a, b, c], [d, e, f]]) => {
            // this would have been cool with pattern matching
            if (a === '|' && d === '^') return '|'
            if (c === '|' && f === '^') return '|'
            if (e === '^') return '^'
            if (b === 'S') return '|'
            if (b === '|') return '|'
            return e
          })
        )([oldField, newField]),
      ]

pipe(
  //
  readData,
  split('\n'),
  reduce(splitField, [0, undefined]),
  console.log
)('src/2025/day07/input1.txt')
