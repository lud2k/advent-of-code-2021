const day13part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/13/input')
  const data = await response.text()
  const sections = data.split('\n\n')
  const coords = sections[0].split('\n').map(line => line.split(',').map(n => parseInt(n, 10))).reduce((ret, coord) => {
    ret[coord.join(',')] = coord
    return ret
  }, {})
  const folds = sections[1].split('\n').slice(0, -1).map(sec => sec.match(/ ([xy])=(\d+)$/).slice(1,3).map((ele, idx) => idx === 1 ? parseInt(ele, 10) : ele))

  for (const fold of folds) {
    if (fold[0] === 'x') {
      for (const coord of Object.values(coords)) {
        if (coord[0] > fold[1]) {
          delete coords[coord.join(',')]
          const newCoords = [2*fold[1]-coord[0], coord[1]]
          coords[newCoords.join(',')] = newCoords
        }
      }
    }
    if (fold[0] === 'y') {
      for (const coord of Object.values(coords)) {
        if (coord[1] > fold[1]) {
          delete coords[coord.join(',')]
          const newCoords = [coord[0], 2*fold[1]-coord[1]]
          coords[newCoords.join(',')] = newCoords
        }
      }
    }
  }

  const finalCoords = Object.values(coords)
  const xMax = finalCoords.reduce((ret, [x,y]) => Math.max(ret, x), 0) + 1
  const yMax = finalCoords.reduce((ret, [x,y]) => Math.max(ret, y), 0) + 1
  const map = Array(yMax).fill(null).map(row => Array(xMax).fill(" "))
  for (const [x,y] of finalCoords) {
    map[y][x] = "#"
  }
  console.log(map.map(c => c.join('')).join('\n'))
}

day13part1()
