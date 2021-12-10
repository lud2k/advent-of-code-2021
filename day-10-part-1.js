const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
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
        console.log('>', line, i, c, last, scores[c])
        return scores[c]
      }
    }
  }
  return 0
}

const day10part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/10/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const score = lines.reduce((ret, line) => ret + checkLine(line), 0)
  console.log('score', score)
}

day10part1()
