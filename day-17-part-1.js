const testSolution = (vx, vy, target) => {
  let x = 0
  let y = 0
  let maxY = -Number.MAX_VALUE

  while (y >= target.y[0]) {
    if (x >= target.x[0] && x <= target.x[1] &&
        y >= target.y[0] && y <= target.y[1]) return maxY

    x += vx
    y += vy
    maxY = Math.max(maxY, y)
    if (vx > 0) vx--
    vy--
  }
}

const day17part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/17/input')
  const data = await response.text()
  const match = data.match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/)
  const target = { x: [parseInt(match[1], 10), parseInt(match[2], 10)], y: [parseInt(match[3], 10), parseInt(match[4], 10)] }

  const position = [0,0]
  const velocity = [0,0]
  const minDistance = target.x[0]-position[0]
  const maxDistance = target.x[1]-position[0]
  
  let curV = 0
  let curX = 0
  const velocities = []
  while (curX <= maxDistance) {
    curX += curV
    if (curX >= minDistance && curX <=maxDistance) {
      velocities.push(curV)
    }
    curV++
  }
  const vx = velocities[0]

  let maxMaxY = -Number.MAX_VALUE
  let vy = vx * 100
  while (vy > 0) {
    const maxY = testSolution(vx, vy, target)
    if (maxY && maxY > maxMaxY) {
      maxMaxY = maxY
    }
    vy--
  }
  console.log('result', vx, vy, maxMaxY)
}

day17part1()
