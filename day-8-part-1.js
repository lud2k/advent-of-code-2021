const day8part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/8/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const outputs = lines.map(line => line.split(' | ')[1].split(' '))
  const set = new Set([2, 3, 4, 7])
  const result = outputs.flat().filter(output => set.has(output.length)).length
  console.log('result', result)
}

day8part1()
