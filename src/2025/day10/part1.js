import fs from 'fs'
import { pipe, join, sum, always, head, range, length, tap, map, slice, split, reduce } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const parseLighting = reduce((accum, c) => {
  if (c === '[') return ''
  if (c === '.') return `${accum}0`
  if (c === '#') return `${accum}1`
  if (c === ']') return Number.parseInt(accum, 2)
  return accum
}, '')

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
  // const joltage = tail(arr)
  return [
    //
    parseLighting(lighting),
    map(parseButton(length(lighting) - 2), middle),
  ]
}

const fewestSteps = ([goal, [nextButton, ...remainingButtons]], pushes = 0) => {
  if (nextButton === undefined && goal !== 0) return Infinity
  if (goal === 0) return pushes
  return Math.min(
    fewestSteps([goal, remainingButtons], pushes),
    fewestSteps([goal ^ nextButton, remainingButtons], pushes + 1)
  )
}

pipe(
  //
  readData,
  split('\n'),
  map(split(' ')),
  map(tokensToSetup),
  map(fewestSteps),
  sum,
  console.log
)('src/2025/day10/input2.txt')
