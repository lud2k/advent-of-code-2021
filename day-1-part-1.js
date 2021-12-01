const response = await fetch('https://adventofcode.com/2021/day/1/input')
const data = await response.text()
const depths = data.split('\n').map(line => parseInt(line, 10))
let increases = 0
for (let i=1; i<depths.length; i++) {
  if (depths[i-1] < depths[i]) {
    increases += 1
  }
}
console.log('increases', increases)
