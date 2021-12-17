const testSolution = (vx, vy, target) => {
  let x = 0
  let y = 0

  while (y >= target.y[0]) {
    if (x >= target.x[0] && x <= target.x[1] &&
        y >= target.y[0] && y <= target.y[1]) return true

    x += vx
    y += vy
    if (vx > 0) vx--
    vy--
  }
  return false
}

const day17part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/17/input')
  const data = await response.text()
  const match = data.match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/)
  const target = { x: [parseInt(match[1], 10), parseInt(match[2], 10)], y: [parseInt(match[3], 10), parseInt(match[4], 10)] }
  const maxDistance = Math.sqrt(target.x[1]*target.x[1]+target.y[0]*target.y[0])

  let result = 0
  for (let vx=1; vx<maxDistance; vx++) {
    for (let vy=target.y[0]; vy<1000; vy++) {
      if (testSolution(vx, vy, target)) {
        result++
      }
    }
  }
  console.log('result', result)
}

day17part1()
