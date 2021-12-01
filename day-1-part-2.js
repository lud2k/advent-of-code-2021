const response = await fetch('https://adventofcode.com/2021/day/1/input')
const data = await response.text()
const depths = data.split('\n').slice(0,-1).map(line => parseInt(line, 10))
let increases = 0
let windowSum = 0
for (let i=0; i<depths.length; i++) {
  const lastWindowSum = windowSum
  windowSum += depths[i]
  if (i > 2) {
    windowSum -= depths[i-3]
    if (lastWindowSum < windowSum) {
      increases += 1
    }
  }
}
console.log('increases', increases)
