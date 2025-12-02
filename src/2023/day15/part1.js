import { add, multiply, modulo, reduce, sum, pipe, map, flip, __ } from 'ramda'

// import input from './test.js'
// import input from './verify.js'
import input from './real.js'

const hash = (s) =>
  reduce(
    (current, c) =>
      pipe(
        //
        add(c.charCodeAt(0)),
        multiply(17),
        flip(modulo)(256)
      )(current),
    0,
    s
  )

pipe(map(hash), sum, console.log)(input)
