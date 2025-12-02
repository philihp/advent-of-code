import fs from 'fs'
import { reduce, tap, pipe, view, assoc, lensProp } from 'ramda'

const data = fs.readFileSync('src/2025/day1/input2.txt', 'utf8')

const initialState = {
  password: 0,
  pointingAt: 50,
}

pipe(
  reduce(
    (state, command) =>
      pipe(
        tap(console.log),
        assoc('direction', command.slice(0, 1) === 'L' ? -1 : 1),
        assoc('distance', Number.parseInt(command.slice(1), 10)),
        ({ direction, distance, pointingAt, ...state }) => ({
          ...state,
          pointingAt: (pointingAt + 100 + direction * distance) % 100,
        }),
        ({ password, pointingAt, ...state }) => ({
          ...state,
          pointingAt,
          password: password + (pointingAt === 0 ? 1 : 0),
        }),
        tap(console.log)
      )(state),
    initialState
  ),
  view(lensProp('password')),
  console.log
)(data.split('\n'))
