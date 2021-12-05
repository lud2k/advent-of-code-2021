const getCoordsBetweenCoords = (coords) => {
  ret = []
  const xStart = coords[0]
  const yStart = coords[1]
  const xDiff = coords[2]-coords[0]
  const yDiff = coords[3]-coords[1]
  const distance = Math.max(Math.abs(xDiff), Math.abs(yDiff))
  const xDir = Math.max(Math.min(xDiff, 1), -1)
  const yDir = Math.max(Math.min(yDiff, 1), -1)
  for (let i=0; i<=distance; i++) {
    ret.push(`${xStart+i*xDir},${yStart+i*yDir}`)
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
