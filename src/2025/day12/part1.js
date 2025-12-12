import fs from 'fs'
import { map, flatten, zipWith, multiply, pipe, split, length, last, sum, slice } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)
const dot = pipe(zipWith(multiply), sum)

const splitSections = (sections) => {
  const presents = pipe(
    slice(0, length(sections) - 1),
    map(split('\n')),
    map(([_, ...row]) =>
      pipe(
        map(
          pipe(
            split(''),
            map((s) => (s === '#' ? 1 : 0))
          )
        ),
        flatten,
        sum
      )(row)
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
          return width * height - dot(presentCount, presents) >= 0 ? 1 : 0
        }
      )
    )
  )(sections)
}

pipe(
  //
  readData,
  split('\n\n'),
  splitSections,
  sum,
  console.log
)('src/2025/day12/input2.txt')
