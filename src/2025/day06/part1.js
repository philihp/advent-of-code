import fs from 'fs'
import { equals, reverse, transpose, complement, pipe, map, split, sum, product, filter } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const atoi = (s) => Number.parseInt(s, 10)

pipe(
  //
  readData,
  split('\n'),
  map(
    pipe(
      //
      split(/ +/),
      filter(complement(equals('')))
    )
  ),
  transpose,
  map(reverse),
  map(([operation, ...terms]) => [operation, ...map(atoi, terms)]),
  map(([operation, ...terms]) => {
    switch (operation) {
      case '*':
        return product(terms)
      case '+':
        return sum(terms)
    }
  }),
  sum,
  console.log
)('src/2025/day06/input1.txt')
