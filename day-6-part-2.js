const day6part2 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/6/input')
  const data = await response.text()
  const ages = data.split('\n')[0].split(',').map(n => parseInt(n, 10))
  const buckets = ages.reduce((ret, age) => { ret[age]++; return ret }, [0,0,0,0,0,0,0,0,0])
  for (let day=0; day<256; day++) {
    const nZeros = buckets.shift()
    buckets.push(nZeros)
    buckets[6] += nZeros
  }
  const result = buckets.reduce((ret, n) => ret+n, 0)
  console.log('result', result)
}

day6part2()
