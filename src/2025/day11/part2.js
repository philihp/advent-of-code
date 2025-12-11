import fs from 'fs'
import {
  pick,
  inc,
  pipe,
  sum,
  product,
  splitWhenever,
  filter,
  keys,
  over,
  lensProp,
  fromPairs,
  append,
  tap,
  map,
  assoc,
  mergeAll,
  split,
  reduce,
} from 'ramda'

const readData = (file) => fs.readFileSync(file, 'utf8')

const parseInput = ([node, edgeTo]) => fromPairs([[node, split(/ /, edgeTo)]])

const topoSort = (graph) => {
  const nodes = keys(graph)
  const indegree = pipe(
    reduce((acc, n) => assoc(n, 0, acc), {}),
    (deg) =>
      reduce(
        (acc, node) =>
          reduce(
            (acc2, nbr) => over(lensProp(nbr), inc, acc2), // x => x + 1
            acc,
            graph[node] || []
          ),
        deg,
        nodes
      )
  )(nodes)

  //  Kahn's algorithm
  const step = ({ queue: [n, ...restQ], topo, indegree }) => {
    if (n === undefined) return { topo, indegree }

    // recurse with updated state
    return step({
      ...reduce(
        ({ queue, indegree }, m) => {
          return {
            //
            queue: indegree[m] === 1 ? [m, ...queue] : queue,
            indegree: assoc(m, (indegree[m] ?? 0) - 1, indegree),
          }
        },
        { queue: restQ, indegree },
        graph[n] ?? []
      ),
      topo: append(n, topo),
    })
  }

  const { topo } = step({
    // initial state
    queue: filter((n) => indegree[n] === 0, nodes),
    topo: [],
    indegree,
  })
  return [graph, topo]
}

const pathsBetween = (graph) => {
  return (start, target) => {
    if (start === target) return 1
    const edges = graph[start] ?? []
    const branches = map((n) => pathsBetween(graph)(n, target), edges)
    const total = sum(branches)
    return total
  }
}

pipe(
  //
  readData,
  split('\n'),
  map(split(/: /)),
  map(parseInput),
  mergeAll,
  topoSort,
  tap(console.log),
  ([graph, topo]) => [
    ///
    graph,
    splitWhenever((key) => ['srv', 'fft', 'dac', 'out'].includes(key), topo),
    filter((key) => ['fft', 'dac'].includes(key), topo),
  ],
  ([graph, topo, [cp1, cp2]]) => [
    pathsBetween(pick(topo[0], graph))('svr', cp1),
    pathsBetween(pick([...topo[1], cp1], graph))(cp1, cp2),
    pathsBetween(pick([...topo[2], cp2], graph))(cp2, 'out'),
  ],
  product,
  console.log
)('src/2025/day11/input2.txt')
