const response = await fetch('https://adventofcode.com/2021/day/3/input')
const data = await response.text()
const lines = data.split('\n').slice(0,-1)
const numLines = lines.length
const numBits = lines[0].length
const counts = {}
for (let line of lines) {
  for (let i=0; i<numBits; i++) {
    if (counts[i] === undefined) {
      counts[i] = 0
    }
    if (line[i] === "1") {
      counts[i] += 1
    }
  }
}
let gamma = 0
let epsilon = 0
for (let i=0; i<numBits; i++) {
  if (counts[i] > numLines/2) {
    gamma |= 1 << (numBits-1-i)
  } else {
    epsilon |= 1 << (numBits-1-i)
  }
}
console.log('result', gamma * epsilon)
