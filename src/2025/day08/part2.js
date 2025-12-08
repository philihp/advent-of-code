import fs from 'fs'
import {
  pipe,
  min,
  max,
  product,
  fromPairs,
  reduced,
  nth,
  sum,
  toPairs,
  sortBy,
  slice,
  prop,
  map,
  split,
  unnest,
  length,
  addIndex,
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
)('src/2025/day08/input1.txt')

const initialNetworkMap = ireduce(
  (accum, point, id) => ({
    ...accum,
    [pointId(point)]: id + 1,
  }),
  {}
)(points)

pipe(
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
  map(map(pointId)),
  reduce((accum, link) => {
    // i think using "ap" and "apply" this could be prettier
    const oldId = max(...map((p) => accum[p], link))
    const newId = min(...map((p) => accum[p], link))
    const newPairs = map(([key, network]) => [key, network === oldId ? newId : network], toPairs(accum))

    // when every networkID = 1, then use "reduced" to break out and return the
    // link that collapsed the whole network
    return sum(map(nth(1), newPairs)) === length(newPairs) ? reduced(link) : fromPairs(newPairs)
  }, initialNetworkMap),
  map(split(':')),
  map(nth(0)),
  map(atoi),
  product,
  console.log
)(points)
