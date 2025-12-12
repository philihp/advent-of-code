import fs from 'fs'
import { filter, equals, lt, map, flatten, zipWith, multiply, pipe, tail, split, length, last, sum, slice } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)
const dot = pipe(zipWith(multiply), sum)

const splitSections = (sections) => {
  const presents = pipe(
    slice(0, length(sections) - 1),
    map(
      pipe(
        //
        split('\n'),
        tail,
        map(pipe(split(''))),
        flatten,
        filter(equals('#')),
        length
      )
    )
  )(sections)
  return pipe(
    last,
    split('\n'),
    map(
      pipe(
        //
        split(': '),
        ([dims, counts]) => {
          const [width, height] = map(atoi, split('x')(dims))
          const presentCount = map(atoi, split(' ')(counts))
          return width * height - dot(presentCount, presents)
        }
      )
    ),
    filter(lt(0)),
    length
  )(sections)
}

pipe(
  //
  readData,
  split('\n\n'),
  splitSections,
  console.log
)('src/2025/day12/input2.txt')
