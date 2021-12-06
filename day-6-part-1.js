const day6part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/6/input')
  const data = await response.text()
  const ages = data.split('\n')[0].split(',').map(n => parseInt(n, 10))
  for (let day=0; day<80; day++) {
    const len = ages.length
    for (let i=0; i<len; i++) {
      if (ages[i] === 0) {
        ages[i] = 6
        ages.push(8)
      } else {
        ages[i]--
      }
    }
  }
  console.log('result', ages.length)
}

day6part1()
