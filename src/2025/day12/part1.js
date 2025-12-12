import fs from 'fs'
import { pipe, split } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

pipe(
  //
  readData,
  split('\n'),
  console.log
)('src/2025/day12/input1.txt')
