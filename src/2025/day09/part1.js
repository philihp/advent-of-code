import fs from 'fs'
import { pipe, map, split, addIndex, reduce } from 'ramda'

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
  console.log
)('src/2025/day09/input1.txt')
