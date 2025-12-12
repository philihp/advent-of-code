import fs from 'fs'
import {
  pipe,
  join,
  sum,
  __,
  gte,
  equals,
  lensIndex,
  over,
  dec,
  drop,
  all,
  append,
  dropLast,
  compose,
  reverse,
  head,
  map,
  slice,
  split,
  addIndex,
  reduce,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const imap = addIndex(map)
const last = compose(head, reverse)
const toBinaryString = (length) => (s) => s.toString(2).padStart(length, '0')
const key = join(':')
const atoi = (s) => Number.parseInt(s, 10)

const parseJoltage = pipe(
  //
  drop(1),
  dropLast(1),
  split(','),
  map((n) => Number.parseInt(n, 10))
)

const parseButton = pipe(
  //
  slice(1, -1),
  split(','),
  map(atoi)
)

const tokensToSetup = (arr) => {
  const middle = slice(1, arr.length - 1, arr)
  const joltage = last(arr)
  return [parseJoltage(joltage), map(parseButton, middle)]
}

export const decAt = (arr, n) => over(lensIndex(n), dec, arr)
export const applyButton = reduce(decAt)
const valid = all(gte(__, 0))
const success = all(equals(0))

const minSteps = ([goal, buttons]) => {
  if (!valid(goal)) return null
  if (success(goal)) return 0

  let queue = [[goal, {}, 0]]

  while (queue.length > 0) {
    const [[goal, visited, steps], ...nextQueue] = queue
    queue = nextQueue
    if (!valid(goal)) continue
    const k = key(goal)
    if (visited[k]) continue
    if (success(goal)) return steps
    append(
      queue,
      map(
        (b) => [
          applyButton(goal, b),
          (newVisited = {
            ...visited,
            [k]: true,
          }),
          steps + 1,
        ],
        buttons
      )
    )
  }
  return Infinity
}

pipe(
  //
  readData,
  split('\n'),
  map(split(' ')),
  map(tokensToSetup),
  map(minSteps),
  sum,
  console.log
)('src/2025/day10/input1.txt')
