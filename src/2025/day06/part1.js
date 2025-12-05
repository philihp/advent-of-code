import fs from 'fs'
import { head, reduce, complement, pipe, map, split, compose, flatten, sum, filter } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const atoi = (s) => Number.parseInt(s, 10)

pipe(
  //
  readData,
  split('\n'),
  map(atoi),
  console.log
)('src/2025/day06/input1.txt')
