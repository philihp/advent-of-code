import fs from 'fs'
import { head, reduce, complement, pipe, map, split, compose, flatten, sum, filter } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const atoi = (s) => Number.parseInt(s, 10)

const rawRangeToRange = (rawRange) => map(atoi, split('-', rawRange))

const overlapsWith =
  ([rangeMin, rangeMax]) =>
  ([thisMin, thisMax]) =>
    thisMin > rangeMax + 1 || thisMax < rangeMin - 1

const rangeFrom = (arr) => [Math.min(...arr), Math.max(...arr)]

export const intoDiscreteRange = (accum, range) => [
  ...filter(overlapsWith(range))(accum),
  rangeFrom([...flatten(filter(complement(overlapsWith(range)))(accum)), ...range]),
]

const intoRangeSize = ([min, max]) => max - min + 1

pipe(
  readData,
  split('\n\n'),
  map(split('\n')),
  compose(map(rawRangeToRange), head),
  reduce(intoDiscreteRange, []),
  map(intoRangeSize),
  sum,
  console.log
)('src/2025/day05/input2.txt')
