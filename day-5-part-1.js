const getCoordsBetweenCoords = (coords) => {
  ret = []
  if (coords[0] === coords[2]) {
    const from = Math.min(coords[1], coords[3])
    const to = Math.max(coords[1], coords[3])
    for (let i=from; i<=to; i++) {
      ret.push(`${coords[0]},${i}`)
    }
  } else if(coords[1] === coords[3]) {
    const from = Math.min(coords[0], coords[2])
    const to = Math.max(coords[0], coords[2])
    for (let i=from; i<=to; i++) {
      ret.push(`${i},${coords[1]}`)
    }
  }
  return ret
} 

const day5part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/5/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0,-1)
  const coordsList = lines.map(line => line.match(/(\d+),(\d+) -> (\d+),(\d+)/).slice(1).map(n => parseInt(n, 10)))
  const grid = {}
  coordsList.forEach(coords => {
    getCoordsBetweenCoords(coords).forEach(coord => {
      if (grid[coord] === undefined) {
        grid[coord] = 1
      } else {
        grid[coord]++
      }
    })
  })
  const overlaps = Object.values(grid).filter(value => value > 1)
  console.log('overlaps', overlaps.length)
}

day5part1()
