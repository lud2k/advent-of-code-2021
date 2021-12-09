const union = (s1, s2) => new Set([...s1, ...s2])
const eq = (s1, s2) => s1.size === s2.size && [...s1].filter(x => !s2.has(x)).length === 0


const determineValue = ([patterns, outputs]) => {
  patterns = patterns.map(pattern => new Set(pattern.split('')))
  outputs = outputs.map(output => output.split('').sort().join(''))

  const numsMap = patterns.reduce((ret, pattern) => {
    if (pattern.size === 2) {
      ret[1] = pattern
    } else if (pattern.size === 3) {
      ret[7] = pattern
    } else if (pattern.size === 4) {
      ret[4] = pattern
    } else if (pattern.size === 7) {
      ret[8] = pattern
    }
    return ret
  }, {})

  // 1 U 6 = 8
  patterns.forEach(pattern => {
    if (pattern.size === 6 && eq(union(numsMap[1], pattern), numsMap[8])) {
      numsMap[6] = pattern
    }
  })

  // 9 U 4 = 9
  patterns.forEach(pattern => {
    if (pattern.size === 6 && eq(union(numsMap[4], pattern), pattern)) {
      numsMap[9] = pattern
    }
  })

  // 0 is the only one left with size 6
  patterns.forEach(pattern => {
    if (pattern.size === 6 && pattern !== numsMap[6] && pattern !== numsMap[9]) {
      numsMap[0] = pattern
    }
  })

  // 3 U 1 = 3
  patterns.forEach(pattern => {
    if (pattern.size === 5 && eq(union(numsMap[1], pattern), pattern)) {
      numsMap[3] = pattern
    }
  })

  // 1 U 5 = 9
  patterns.forEach(pattern => {
    if (pattern.size === 5 && eq(union(numsMap[1], pattern), numsMap[9])) {
      numsMap[5] = pattern
    }
  })

  // 2 is the only one left with size 5
  patterns.forEach(pattern => {
    if (pattern.size === 5 && pattern !== numsMap[3] && pattern !== numsMap[5]) {
      numsMap[2] = pattern
    }
  })

  const numsMap2 = Object.entries(numsMap).reduce((ret, [num, pattern]) => {
    ret[[...pattern].sort().join('')] = num
    return ret
  }, {})

  return outputs.reduce((ret, output, index) => {
    return ret + numsMap2[output] * Math.pow(10, 3-index)
  }, 0)
}

const day8part2 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/8/input')
  const data = await response.text()
  const lines = data.split('\n').slice(0, -1)
  const entries = lines.map(line => line.split(' | ').map(s => s.split(' ')))
  const result = entries.reduce((ret, entry) => ret + determineValue(entry), 0)
  console.log('result', result)
}

day8part2()
