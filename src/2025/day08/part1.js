import fs from 'fs'
import {
  pipe,
  product,
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

const pointId = ([x, y, z]) => `${x}:${y}:${z}`

const distance = ([[x1, y1, z1], [x2, y2, z2]]) => [
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2),
  [x1, y1, z1],
  [x2, y2, z2],
]

const points = pipe(
  //
  readData,
  split('\n'),
  map(split(',')),
  map(map(atoi))
)('src/2025/day08/input2.txt')

const connections = pipe(
  //
  imap((srcValue, srcIdx, arr) =>
    map(
      //
      (dstIdx) => [srcValue, arr[dstIdx]],
      range(srcIdx + 1, arr.length)
    )
  ),
  unnest,
  map(distance),
  sortBy(prop(0)),
  map(slice(1, Infinity)),
  map(map(sortBy(prop(0)))),
  // it is now an array of lines, defined by 2 points, sorted by shortest first
  slice(0, 1000),
  map(map(pointId))
)(points)

const networks = pipe(
  reduce(
    (accum, [point1, point2]) => {
      const oldId = Math.max(accum[point1], accum[point2])
      const newId = Math.min(accum[point1], accum[point2])
      return fromPairs(map(([key, network]) => [key, network === oldId ? newId : network], toPairs(accum)))
    },
    ireduce(
      (accum, point, id) => ({
        ...accum,
        [pointId(point)]: id + 1,
      }),
      {}
    )(points)
  ),
  Object.values,
  groupBy(identity),
  map(length),
  toPairs,
  sortBy(prop(1)),
  reverse,
  slice(0, 3),
  map(nth(1)),
  product
)(connections)

console.log(networks)

// 3840 too low
