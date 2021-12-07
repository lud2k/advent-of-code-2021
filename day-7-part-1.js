const day7part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/7/input')
  const data = await response.text()
  const positions = data.split('\n')[0].split(',').map(n => parseInt(n, 10))
  const min = positions.reduce((ret, pos) => Math.min(ret, pos), positions[0])
  const max = positions.reduce((ret, pos) => Math.max(ret, pos), positions[0])
  const costs = {}
  for (let i=min; i<=max; i++) {
    costs[i] = positions.reduce((ret, pos) => ret + Math.abs(pos-i), 0)
  }
  const entry = Object.entries(costs).sort((e1, e2) => e1[1]-e2[1])[0]
  console.log('result', entry[1])
}

day7part1()
