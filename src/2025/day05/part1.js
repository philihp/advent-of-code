import fs from 'fs'
import { any, pipe, map, split, sum } from 'ramda'

const data = fs.readFileSync('src/2025/day05/input2.txt', 'utf8')

const atoi = (s) => Number.parseInt(s, 10)

const rawRangeToRange = (rawRange) => map(atoi, split('-', rawRange))

const rangeIncludes =
  (n) =>
  ([min, max]) =>
    n >= min && n <= max

const isFreshWithRanges = (ranges) => pipe(atoi, (n) => any(rangeIncludes(n), ranges))

const ifTrueThenOne = (b) => (b ? 1 : 0)

pipe(
  split('\n\n'),
  map(split('\n')),
  ([rawRanges, ingredientIDs]) =>
    sum(
      map(
        pipe(
          pipe(
            //
            map(rawRangeToRange),
            isFreshWithRanges
          )(rawRanges),
          ifTrueThenOne
        )
      )(ingredientIDs)
    ),
  console.log
)(data)
