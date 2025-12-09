import fs from 'fs'
import { xprod, pipe, any, filter, max, min, map, split, unnest, addIndex, range, reduce } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)
const imap = addIndex(map)

const colinear =
  ([px, py]) =>
  ([[x1, y1], [x2, y2]]) =>
    x1 === x2
      ? px === x1 && py >= min(y1, y2) && py <= max(y1, y2)
      : py === y1 && px >= min(x1, x2) && px <= max(x1, x2)

const inscribedPoint =
  (edges) =>
  ([px, py]) =>
    any(colinear([px, py]), edges) ||
    reduce(
      (inside, [[x1, y1], [x2, y2]]) =>
        x1 === x2 && //
        py >= Math.min(y1, y2) && //
        py < Math.max(y1, y2) && //
        x1 > px
          ? !inside
          : inside,
      false,
      edges
    )

const inscribedAxis = ([[hx1, hy1], [hx2, hy2]], [[vx1, vy1], [vx2, vy2]]) =>
  hy1 > min(vy1, vy2) && hy1 < max(vy1, vy2) && vx1 > min(hx1, hx2) && vx1 < max(hx1, hx2)

const inscribedCross = (edges) =>
  any((vertEdge) => {
    const [[vx1], [vx2]] = vertEdge
    return any((horiEdge) => {
      const [[hx1], [hx2]] = horiEdge
      return (vx1 === vx2) !== (hx1 === hx2) && vx1 === vx2
        ? inscribedAxis(horiEdge, vertEdge)
        : inscribedAxis(vertEdge, horiEdge)
    })(edges)
  })

const inscribed =
  (edges) =>
  ([[x1, y1], [x2, y2]]) => {
    let left = min(x1, x2)
    let right = max(x1, x2)
    let top = min(y1, y2)
    let bottom = max(y1, y2)
    if (any((c) => !inscribedPoint(edges)(c), xprod([left, right], [top, bottom]))) {
      return false
    }
    return !inscribedCross(edges)(
      xprod(
        [
          [left, top],
          [right, top],
        ],
        [
          [left, bottom],
          [right, bottom],
        ]
      )
    )
  }

const area = ([[x1, y1], [x2, y2]]) => (max(x1, x2) - min(x1, x2) + 1) * (max(y1, y2) - min(y1, y2) + 1)

const points = pipe(
  //
  readData,
  split('\n'),
  map(split(',')),
  map(map(atoi))
)('src/2025/day09/input2.txt')

const edges = imap((point, i, arr) => [point, arr[(i + 1) % arr.length]], points)

pipe(
  imap((srcValue, srcIdx, arr) =>
    map(
      //
      (dstIdx) => [srcValue, arr[dstIdx]],
      range(srcIdx + 1, arr.length)
    )
  ),
  unnest,
  filter(inscribed(edges)),
  // optimization would be to compute area for all, then scan down highest area
  // until there is one that would pass the inscribed(edges) filter.
  map(area),
  reduce(max, 0),
  console.log
)(points)
