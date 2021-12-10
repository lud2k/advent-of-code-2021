const scores = { ')': 1, ']': 2, '}': 3, '>': 4 }
const map = { '(': ')', '[': ']', '{': '}', '<': '>' }

const checkLine = (line) => {
  const stack = []
  for (let i=0; i<line.length; i++) {
    const c = line[i]
    if (!scores[c]) {
      stack.push(c)
    } else {
      const last = stack.pop()
      if (map[last] !== c) {
        return 0
      }
    }
  }
  if (stack.length > 0) {
    stack.reverse()
    return stack.reduce((ret, c) => ret*5 + scores[map[c]], 0)
  }
  return 0
}

const day10part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/10/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const scores = lines.map(checkLine).filter(s => s > 0)
  scores.sort((a, b) => a-b)
  const score = scores[Math.floor((scores.length)/2)]
  console.log('score', score)
}

day10part1()
