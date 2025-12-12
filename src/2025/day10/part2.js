import fs from 'fs'
import {
  pipe,
  join,
  sum,
  gte,
  equals,
  zipWith,
  always,
  until,
  drop,
  isEmpty,
  gt,
  update,
  lt,
  any,
  all,
  dropLast,
  compose,
  reverse,
  head,
  tail,
  range,
  length,
  tap,
  map,
  slice,
  split,
  reduce,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const last = compose(head, reverse)
const toBinaryString = (length) => (s) => s.toString(2).padStart(length, '0')
const id = (n) => JSON.stringify(n)

const parseJoltage = pipe(
  //
  drop(1),
  dropLast(1),
  split(','),
  map((n) => Number.parseInt(n, 10))
)

const parseButton = (numIndicators) =>
  reduce((accum, c) => {
    if (c === '(') return join('', map(always('0'), range(0, numIndicators)))
    if (c === ')') return Number.parseInt(accum, 2)
    if (c === ',') return accum
    const n = Number.parseInt(c, 10)
    return `${slice(0, n, accum)}1${slice(n + 1, accum.length, accum)}`
  }, '')

const tokensToSetup = (arr) => {
  const lighting = head(arr)
  const middle = slice(1, arr.length - 1, arr)
  const joltage = last(arr)
  return [
    //
    parseJoltage(joltage),
    map(parseButton(length(lighting) - 2), middle),
  ]
}

export const applyButton = (goal, button) =>
  zipWith(
    (bit, n) => (bit === '1' ? n - 1 : n),
    pipe(
      //
      toBinaryString(goal.length),
      split('')
    )(button),
    goal
  )

pipe(
  //
  readData,
  split('\n'),
  map(split(' ')),
  map(tokensToSetup),
  // sum,
  console.log
)('src/2025/day10/input1.txt')
