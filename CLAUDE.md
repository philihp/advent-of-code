# Code Style Guide

This file captures the preferred style for this repository, an Advent of Code workspace. Match this style when adding or modifying solutions.

## Repository layout

```
src/<year>/day<NN>/
  part1.js
  part1.test.js   (optional, only when worth testing)
  part2.js
  part2.test.js
  input1.txt      (example/small input)
  input2.txt      (real puzzle input)
```

- Day directories are zero-padded: `day01`, `day02`, ..., `day12`.
- Each `partN.js` is a self-contained runnable script. There is no shared library — small helpers are redefined per-file.
- Input file paths are hardcoded as string literals at the end of the pipe, e.g. `'src/2025/day05/input2.txt'`.

## Language and tooling

- Node.js with native ES modules (`"type": "module"` in `package.json`).
- Built-in test runner: `node --test`, `node:test`, `node:assert/strict`.
- One runtime dependency: **`ramda`**. Use it heavily.
- No TypeScript, no bundler, no transpiler.

## Prettier (authoritative)

```json
{
  "endOfLine": "lf",
  "printWidth": 120,
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

No semicolons. Single quotes. 2-space indent. 120-char lines. LF endings.

## Solution shape

Every solution is a single top-level `pipe(...)` invoked with the input filename:

```js
import fs from 'fs'
import { pipe, map, split, sum } from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)

pipe(
  //
  readData,
  split('\n'),
  map(atoi),
  sum,
  console.log
)('src/2025/dayNN/input2.txt')
```

Rules of the shape:

- The pipe is the program. No `main()` wrapper, no CLI parsing, no exports unless a function is being unit-tested.
- The terminal stage is almost always `console.log` (the pipe is the side effect).
- The filename literal at the bottom is the data source. Don't read the file into a top-level `data` const unless you have a reason (older files like `day01` do this; newer files prefer threading through `readData`).
- Hardcoded paths are fine and expected. Don't add `process.argv` plumbing.

## The `//` line-leader trick

A solitary `//` comment is intentionally placed as the first argument of a multi-line `pipe(...)`, `map(pipe(...))`, etc., to force Prettier to keep each step on its own line:

```js
pipe(
  //
  readData,
  split('\n'),
  ...
)
```

Preserve these. Add one when introducing a new multi-line pipe. They are a style signature, not noise.

The same trick appears as a trailing `//` to force breaks inside expressions:

```js
password +
  (pointingAt <= 0 && !startedAtZero ? 1 : 0) + //
  (pointingAt >= 100 && !startedAtZero ? 1 : 0) + //
  extraSpins,
```

## Functional style

The 2025 README states the goals plainly: **avoid loops, prefer reducers/maps/filters; reach for transducers; no AI assistance.** Honor that:

- Reach for Ramda first: `pipe`, `map`, `filter`, `reduce`, `reverse`, `transpose`, `split`, `slice`, `sortBy`, `prop`, `head`, `tail`, `last`, `length`, `sum`, `product`, `range`, `flatten`, `unnest`, `chain`, `assoc`, `over`, `lensProp`, `lensIndex`, `fromPairs`, `toPairs`, `groupBy`, `addIndex`, `aperture`, `xprod`, etc.
- Use **currying / point-free** wherever it reads well: `filter(equals('#'))`, `map(atoi)`, `gte(__, 0)`. Don't force point-free when it hurts clarity.
- Define curried helpers as nested arrows:
  ```js
  const rangeIncludes =
    (n) =>
    ([min, max]) =>
      n >= min && n <= max
  ```
- Use `reduce` (not loops) to fold state. State is typically a small object or tuple; update it via destructure + spread:
  ```js
  ({ direction, distance, pointingAt, ...state }) => ({
    ...state,
    pointingAt: (pointingAt + 100 + direction * distance) % 100,
  })
  ```
- Recursion is preferred over `for`/`while`. When recursion is awkward (e.g., BFS with a mutable queue), a `while` loop is acceptable — see `day10/part2.js`.
- `switch` is acceptable for opcode-style branching.
- Native methods are fine where they're shorter: `Math.max(...arr)`, `Math.min(...arr)`, `Number.parseInt(s, 10)`, `arr.slice(...)`.

## Standard per-file helpers

These are redefined in many files; don't try to DRY them into a shared module — that's not how this codebase is organized.

```js
const readData = (file) => fs.readFileSync(file, 'utf8')
const atoi = (s) => Number.parseInt(s, 10)
const imap = addIndex(map)
const ireduce = addIndex(reduce)
const last = compose(head, reverse)   // when not importing ramda's `last`
```

## Imports

- Always `import fs from 'fs'` at the top.
- Ramda imports are a single destructured `import { ... } from 'ramda'` block.
- Order within the destructure is **not** sorted — keep it as you wrote it. Don't reorder existing imports.
- Long Ramda import lists wrap across many lines; that's expected. Trailing comma on the last entry.
- It's okay if a file imports something it doesn't end up using (e.g., `tap`, `flatten`, `range` left behind from iteration). Don't aggressively prune unless asked.

## Tests

- Co-located: `partN.test.js` next to `partN.js`.
- Use the Node built-ins exclusively:
  ```js
  import { thingUnderTest } from './partN.js'
  import { describe, it } from 'node:test'
  import assert from 'node:assert/strict'
  ```
- One `describe` per exported function, with `it` cases. Use `assert.equal`, `assert.deepEqual`.
- Stub tests are okay when scaffolding a new day:
  ```js
  import {} from './part1.js'
  describe('applyButton', () => {
    it('compiles', () => {
      const actual = undefined
      assert.equal(actual, undefined)
    })
  })
  ```
- Functions only need `export` when a test imports them. Internal helpers stay un-exported.

## Naming

- Camel case for functions and variables.
- Single-letter names for trivial locals (`s`, `n`, `c`, `b`, `i`, `arr`). Descriptive names for anything carried more than a few lines.
- Tuple destructuring with meaningful names: `([min, max])`, `([[x1, y1], [x2, y2]])`.
- Function names read as actions or predicates: `parseInput`, `applyButton`, `isFreshWithRanges`, `inscribedPoint`, `rangeIncludes`.

## Comments

- Default to no comments. Names should carry the meaning.
- Acceptable comments seen in this codebase:
  - The `//` Prettier-formatting markers (see above).
  - Short asides about an approach or known limitation: `// this would have been cool with pattern matching`, `// tail recursion dont fail me now`, `// Kahn's algorithm`.
  - Tried-but-wrong answers left as a trailing note: `// 3840 too low`.
  - A one-liner noting a possible optimization: `// optimization would be to compute area for all, then scan down…`
- Don't add JSDoc, don't add what-the-code-does narration.

## Don'ts

- Don't add a build step, TypeScript, ESLint config beyond what exists, or new dependencies.
- Don't introduce shared utility files; keep helpers local.
- Don't rewrite a working solution to be "cleaner" unless asked.
- Don't strip the `//` formatting markers.
- Don't add semicolons.
- Don't replace Ramda functions with hand-rolled equivalents.
- Don't wrap the script in `if (import.meta.url === ...)` guards; the pipe runs on import, that's the point.
