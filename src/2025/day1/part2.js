import fs from 'fs'
import { reduce, tap, pipe, view, assoc, lensProp } from 'ramda'

const data = fs.readFileSync('src/2025/day1/input2.txt', 'utf8')

const initialState = {
  password: 0,
  pointingAt: 50,
}

export const applyCommand = (state, command) =>
  pipe(
    tap(() => console.log(command)),
    tap(console.log),
    assoc('direction', command.slice(0, 1) === 'L' ? -1 : 1),
    assoc('distance', Number.parseInt(command.slice(1), 10)),
    ({ direction, distance, pointingAt, ...state }) => ({
      ...state,
      startedAtZero: pointingAt === 0,
      pointingAt: pointingAt + direction * (distance % 100),
      extraSpins: Math.floor(distance / 100),
    }),
    tap(console.log),
    ({ extraSpins, password, pointingAt, startedAtZero, ...state }) => ({
      ...state,
      pointingAt: (pointingAt + 100) % 100,
      password:
        password + //
        (pointingAt <= 0 && !startedAtZero ? 1 : 0) + //
        (pointingAt >= 100 && !startedAtZero ? 1 : 0) + //
        extraSpins,
    }),
    tap(console.log)
  )(state)

pipe(
  //
  reduce(applyCommand, initialState),
  view(lensProp('password')),
  console.log
)(data.split('\n'))
