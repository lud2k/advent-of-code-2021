const increaseLevelsAndCountFlashes = (grid) => {
  const flashed = []
  const flashes = []
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[0].length; y++) {
      grid[x][y]++
      if (grid[x][y] === 10) {
        flashes.push([x,y])
        flashed.push([x,y])
      }
    }
  }

  while (flashes.length > 0) {
    const [x,y] = flashes.shift()
    for (var i=-1; i<=1; i++) {
      for (var j=-1; j<=1; j++) {
        if ((i !== 0 || j !== 0) && x+i >= 0 && y+j >= 0 && x+i < grid.length && y+j < grid[0].length) {
          grid[x+i][y+j]++
          if (grid[x+i][y+j] === 10) {
            flashes.push([x+i, y+j])
            flashed.push([x+i, y+j])
          }
        }
      }
    }
  }

  for ([x,y] of flashed) {
    grid[x][y] = 0
  }

  return flashed.length
}

const day11part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/11/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const grid = lines.map(line => line.split('').map(n => parseInt(n, 10)))
 
 let flashes = 0
  for (let i=0; i<100; i++) {
    flashes += increaseLevelsAndCountFlashes(grid)
  }
  console.log('flashes', flashes)
}

day11part1()
