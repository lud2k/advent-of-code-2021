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

  let curV = 0
  let curX = 0
  let vx = 0
  while (curX <= target.x[1]) {
    curX += curV
    if (curX >= target.x[0] && curX <=target.x[1]) {
      vx = curV
      break
    }
    curV++
  }

  let result = -Number.MAX_VALUE
  const svy = Math.abs(target.y[1])
  const evy = Math.abs(target.y[0])
  for (let vy = svy; vy<evy; vy++) {
    const maxY = testSolution(vx, vy, target)
    if (maxY !== undefined && maxY > result) {
      result = maxY
    }
  }
  console.log('result', result)
}

day17part1()
