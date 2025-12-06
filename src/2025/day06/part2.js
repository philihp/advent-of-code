import fs from 'fs'
import {
  compose,
  length,
  trim,
  head,
  join,
  reverse,
  transpose,
  tail,
  add,
  pipe,
  map,
  split,
  slice,
  sum,
  product,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const atoi = (s) => Number.parseInt(s, 10)

const last = compose(head, reverse)

const removeSpaceFromAllButLast = (arr) => {
  const [lastElem, ...revRem] = reverse(arr)
  return reverse([lastElem, ...map((s) => slice(0, s.length - 1, s), revRem)])
}

export const splitBy =
  ([thisDelim, ...delims]) =>
  (str) =>
    thisDelim === undefined
      ? []
      : [
          // tail recursion dont fail me now
          slice(0, thisDelim, str),
          ...splitBy(delims)(slice(thisDelim, str.length, str)),
        ]

export const convertTermsToNumbers = ([opcode, ...terms]) => [
  trim(opcode),
  ...reverse(
    map(
      pipe(
        //
        reverse,
        join(''),
        atoi
      ),
      transpose(terms)
    )
  ),
]

export const applyOpcode = ([opcode, ...terms]) => {
  switch (opcode) {
    case '*':
      return product(terms)
    case '+':
      return sum(terms)
  }
}

pipe(
  //
  readData,
  split('\n'),
  (field) =>
    map(
      splitBy(
        pipe(
          //
          last,
          split(/[\+\*]/),
          map(length),
          tail,
          map(add(1))
        )(field)
      )
    )(field),
  map(removeSpaceFromAllButLast),
  transpose,
  map(reverse),
  reverse,
  map(convertTermsToNumbers),
  map(applyOpcode),
  sum,
  console.log
)('src/2025/day06/input2.txt')
