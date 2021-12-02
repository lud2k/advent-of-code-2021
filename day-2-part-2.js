const response = await fetch('https://adventofcode.com/2021/day/2/input')
const data = await response.text()
const commands = data.split('\n').slice(0,-1).map(line => {
  const data = line.split(' ')
  return [data[0], parseInt(data[1], 10)]
})
let horizontal = 0
let depth = 0
let aim = 0
for ([command, num] of commands) {
  if (command === "forward") {
    horizontal += num
    depth += num*aim
  }
  if (command === "down") {
    aim += num
  }
  if (command === "up") {
    aim -= num
  }
}
console.log('result', horizontal*depth)
