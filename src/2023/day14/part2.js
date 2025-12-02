import {
  tap,
  reduce,
  reverse,
  product,
  range,
  sortBy,
  identity,
  join,
  split,
  transpose,
  sum,
  pipe,
  map,
  addIndex,
} from 'ramda'

// import input from './test.js'
import input from './real.js'

const tiltNorth = pipe(
  transpose,
  map(
    pipe(
      //
      join(''),
      split('#'),
      map(
        pipe(
          //
          sortBy(identity),
          reverse,
          join('')
        )
      ),
      join('#')
    )
  ),
  transpose,
  map(join(''))
)

const tiltSouth = pipe(
  transpose,
  map(
    pipe(
      //
      join(''),
      split('#'),
      map(
        pipe(
          //
          sortBy(identity),
          join('')
        )
      ),
      join('#')
    )
  ),
  transpose,
  map(join(''))
)

const tiltWest = pipe(
  map(
    pipe(
      //
      split('#'),
      map(
        pipe(
          //
          sortBy(identity),
          reverse,
          join('')
        )
      ),
      join('#')
    )
  )
)

const tiltEast = pipe(
  map(
    pipe(
      //
      split('#'),
      map(
        pipe(
          //
          sortBy(identity),
          join('')
        )
      ),
      join('#')
    )
  )
)

const tiltCycle = pipe(tiltNorth, tiltWest, tiltSouth, tiltEast)

// map(console.log)(input)
// console.log()

const cycles = 1000000000

pipe(
  (state) => {
    let memory = {}
    let i = 0
    let cycleLength = undefined
    for (; i < cycles; i++) {
      memory[state.join('\n')] = i
      state = tiltCycle(state)
      const next = state.join('\n')
      if (memory[next] !== undefined && cycleLength === undefined) {
        console.log('cycle detected at ', i)
        console.log('loops with ', memory[next])
        console.log('cycle length ', i - memory[next])
        cycleLength = i - memory[next]
        i = cycles - (cycles % cycleLength)
      }
    }
    return state
  },
  map(tap(console.log)),
  addIndex(map)((s, i) => [s.split('O').length - 1, input.length - i]),
  map(product),
  sum,
  console.log
)(input)
