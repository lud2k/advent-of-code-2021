const day15part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/15/input')
  const data = await response.text()
  const digits = data.split('\n').slice(0, -1).map((line, x) => line.split('').map((n, y) => parseInt(n, 10)))
  const size = digits.length

  for (let i=1; i<5; i++) {
    for (let x=0; x<size; x++) {
      for (let y=0; y<size; y++) {
        digits[x].push((digits[x][y]+i-1)%9+1)
      }
    }
  }

  for (let i=1; i<5; i++) {
    for (let x=0; x<size; x++) {
      const row = []
      for (let y=0; y<digits[0].length; y++) {
        row.push((digits[x][y]+i-1)%9+1)
      }
      digits.push(row)
    }
  }

  const grid = digits.map((line, x) => line.map((n, y) => ({ risk: n, smallestRisk: Number.MAX_VALUE, smallestFrom: null, x, y })))

  grid.forEach((row, x) => row.forEach((cell, y) => {
    cell.neighbors = []
    if (x-1 > 0) cell.neighbors.push(grid[x-1][y])
    if (y-1 > 0) cell.neighbors.push(grid[x][y-1])
    if (x+1 < grid.length) cell.neighbors.push(grid[x+1][y])
    if (y+1 < row.length) cell.neighbors.push(grid[x][y+1])
  }))

  grid[0][0].smallestRisk = 0

  const open = [grid[0][0]]
  const visited = new Set()
  while (open.length > 0) {
    open.sort((a, b) => b.smallestRisk - a.smallestRisk)
    const element = open.pop()
    for (const neighbor of element.neighbors) {
      if (visited.has(neighbor)) continue

      if (neighbor.smallestRisk > element.smallestRisk + neighbor.risk) {
        neighbor.smallestRisk = element.smallestRisk + neighbor.risk
        neighbor.smallestFrom = element
      }
      if (!open.includes(neighbor)) {
        open.push(neighbor)
      }
    }
    visited.add(element)
  }
  console.log('result', grid[grid.length-1][grid[0].length-1].smallestRisk)
}

day15part1()
