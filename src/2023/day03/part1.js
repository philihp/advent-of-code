import R from 'ramda'

export default R.pipe(
  //
  R.map(R.append('\n')),
  R.addIndex(R.reduce)(
    (accum, row, rowNum) =>
      R.addIndex(R.reduce)((accum, char, colNum) => {
        switch (char) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            return {
              ...accum,
              labels: [...accum.labels],
              pins: [...accum.pins],
              labelBuffer: accum.labelBuffer + char,
              // console.log({ rowNum, colNum, char })
              // return accum
            }
          case '\n':
          case '.':
            return {
              ...accum,
              labels: [
                ...accum.labels,
                ...(accum.labelBuffer !== ''
                  ? [[accum.labelBuffer, rowNum - 1, colNum - accum.labelBuffer.length - 1, rowNum + 1, colNum + 1]]
                  : []),
              ],
              pins: [...accum.pins],
              labelBuffer: '',
            }
          default:
            return {
              ...accum,
              labels: [
                ...accum.labels,
                ...(accum.labelBuffer !== ''
                  ? [[accum.labelBuffer, rowNum - 1, colNum - accum.labelBuffer.length - 1, rowNum + 1, colNum + 1]]
                  : []),
              ],
              pins: [...accum.pins, [rowNum, colNum]],
              labelBuffer: '',
            }
        }
      }, accum)(row),
    { labels: [], pins: [], labelBuffer: '' }
  ),
  R.tap(console.log),
  ({ labels, pins }) =>
    R.filter(([_, yMin, xMin, yMax, xMax]) =>
      R.any(([yPin, xPin]) => xMin <= xPin && xPin <= xMax && yMin <= yPin && yPin <= yMax)(pins)
    )(labels),
  R.tap(console.log),
  R.map(R.nth(0)),
  R.map((n) => Number(n)),
  R.sum,
  R.tap(console.log)
)

// 534039 too high
