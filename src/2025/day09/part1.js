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

const pointId = ([x, y]) => `(${x},${y})`

const area = ([[x1, y1], [x2, y2]]) => [
  //
  (Math.max(x1, x2) - Math.min(x1, x2) + 1) * (Math.max(y1, y2) - Math.min(y1, y2) + 1),
  `(${x1},${y1})(${x2},${y2})`,
  Math.abs(x1 - x2) + 1,
  Math.abs(y1 - y2) + 1,
]

pipe(
  //
  readData,
  split('\n'),
  map(split(',')),
  map(map(atoi)),
  sortBy(prop(0)),
  imap((srcValue, srcIdx, arr) =>
    map(
      //
      (dstIdx) => [srcValue, arr[dstIdx]],
      range(srcIdx + 1, arr.length)
    )
  ),
  unnest,
  map(area),
  sortBy(prop(0)),
  reverse,
  slice(0, 5),
  console.log
)('src/2025/day09/input2.txt')
