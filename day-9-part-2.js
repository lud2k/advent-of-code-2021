const isLowPoint = (grid, i, j) => {
  let ret = true
  if (i > 0) {
    ret &= grid[i-1][j] > grid[i][j]
  }
  if (j > 0) {
    ret &= grid[i][j-1] > grid[i][j]
  }
  if (i < grid.length-1) {
    ret &= grid[i+1][j] > grid[i][j]
  }
  if (j < grid[0].length-1) {
    ret &= grid[i][j+1] > grid[i][j]
  }
  return ret
}

const visitBasin = (grid, i, j) => {
  if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length && grid[i][j] !== 9) {
    grid[i][j] = 9
    let ret = 1
    ret += visitBasin(grid, i-1, j)
    ret += visitBasin(grid, i, j-1)
    ret += visitBasin(grid, i+1, j)
    ret += visitBasin(grid, i, j+1)
    return ret
  } else {
    return 0
  }
}

const day9part2 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/9/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const grid = lines.map(line => line.split('').map(num => parseInt(num, 10)))
  let basins = []
  grid.forEach((row, i) => {
    row.forEach((num, j) => {
      if (isLowPoint(grid, i, j)) {
        basins.push(visitBasin(grid, i, j))
      }
    })
  })
  const result = basins.sort((a, b) => (a - b)).slice(-3).reduce((ret, num) => ret * num, 1)
  console.log('result', result)
}

day9part2()
