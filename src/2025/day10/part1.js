import fs from 'fs'
import {
  pipe,
  sort,
  product,
  ascend,
  descend,
  fromPairs,
  reverse,
  nth,
  lift,
  identity,
  toPairs,
  tap,
  groupBy,
  sortBy,
  slice,
  prop,
  map,
  split,
  unnest,
  length,
  addIndex,
  flatten,
  range,
  reduce,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)
const imap = addIndex(map)
const ireduce = addIndex(reduce)

pipe(
  //
  readData,
  split('\n'),
  map(split(' ')),
  console.log
)('src/2025/day10/input1.txt')
