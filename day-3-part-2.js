const response = await fetch('https://adventofcode.com/2021/day/3/input')
const data = await response.text()
const lines = data.split('\n').slice(0,-1)
const oxygen = findRating(lines, false)
const scrubber = findRating(lines, true)
console.log('result', oxygen * scrubber)

function findRating(lines, leastCommon) {
  const numBits = lines[0].length
  for (let i=0; i<numBits && lines.length > 1; i++) {
    const ones = []
    const zeros = []
    const numLines = lines.length
    for (let line of lines) {
      if (line[i] === "1") {
        ones.push(line)
      } else {
        zeros.push(line)
      }
    }
    if (ones.length === zeros.length) {
      lines = leastCommon ? zeros : ones
    } else if (ones.length > zeros.length) {
      lines = leastCommon ? zeros : ones
    } else {
      lines = leastCommon ? ones : zeros
    }
  }
  return parseInt(lines[0], 2)
}
