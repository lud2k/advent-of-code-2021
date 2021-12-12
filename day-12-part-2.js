const makeGraph = (links) => {
  const graph = {}
  for (const link of links) {
    graph[link[0]] = { name: link[0], isUpper: link[0] === link[0].toUpperCase(),  links: new Set() }
    graph[link[1]] = { name: link[1], isUpper: link[1] === link[1].toUpperCase(), links: new Set() }
  }
  for (const link of links) {
    graph[link[0]].links.add(graph[link[1]])
    graph[link[1]].links.add(graph[link[0]])
  }
  return graph
}

const findAllPaths = (start, end, cur, paths, visitedSmall) => {
  cur = cur.concat(start.name)
  if (start === end) {
    paths.push(cur)
  } else {
    for (const elem of start.links) {
      if (elem.name === "start") continue

      if (!elem.isUpper && cur.includes(elem.name) && !visitedSmall) {
        findAllPaths(elem, end, cur, paths, true)
      } else if (elem.isUpper || !cur.includes(elem.name)) {
        findAllPaths(elem, end, cur, paths, visitedSmall)
      }
    }
  }
}

const day12part2 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/12/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const links = lines.map(line => line.split('-'))
  const graph = makeGraph(links)
  const paths = []
  findAllPaths(graph['start'], graph['end'], [], paths, false)
  console.log('paths', paths.length)
}

day12part2()
