const R = require('ramda')

const testPairs = [
  [71530, 940200],
]
const actualPairs = [[ 60947882,475213810151650]]

R.pipe(
  //
  R.map(
    R.pipe(
      ([time, record]) =>
        R.map(
          (holdTime) => 
            holdTime * (time - holdTime) > record ? 1 : 0
          ,
          R.range(0, time)
        ),
      R.sum
    )
  ),
  R.tap(console.log)
)(actualPairs)

