import fs from 'fs'
import {
  pipe,
  join,
  sum,
  always,
  head,
  range,
  fromPairs,
  chain,
  length,
  append,
  tap,
  map,
  assoc,
  slice,
  includes,
  mergeAll,
  split,
  reduce,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const parseInput = ([node, edgeTo]) => fromPairs([[node, split(/ /, edgeTo)]])

const dfsToOut = (start, target) => (graph) => {
  const go = (node, path) => {
    if (node === target) return [[...path, node]]
    if (includes(node, path)) return []
    return chain((next) => go(next, append(node, path)), graph[node] ?? [])
  }

  return go(start, [])
}

pipe(
  //
  readData,
  split('\n'),
  map(split(/: /)),
  map(parseInput),
  mergeAll,
  dfsToOut('you', 'out'),
  length,
  console.log
)('src/2025/day11/input2.txt')
