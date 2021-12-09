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

const day9part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/9/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const grid = lines.map(line => line.split('').map(num => parseInt(num, 10)))
  let risk = 0
  grid.forEach((row, i) => {
    row.forEach((num, j) => {
      if (isLowPoint(grid, i, j)) {
        risk += num + 1
      }
    })
  })
  console.log('risk', risk)
}

day9part1()
