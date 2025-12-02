const R = require('ramda')

const testPairs = [
  [7, 9],
  [15, 40],
  [30, 200],
]

const actualPairs = [
  [60, 475],
  [94, 2138],
  [78, 1015],
  [82, 1650],
]

R.pipe(
  //
  R.map(
    R.pipe(
      ([time, record]) =>
        R.map(
          (holdTime) => {
            const runTime = time - holdTime
            return holdTime * runTime > record ? 1 : 0
          },
          R.range(0, time)
        ),
      R.sum
    )
  ),
  R.reduce((a, b) => a * b, 1),
  R.tap(console.log)
)(actualPairs)
