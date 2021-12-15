const day14part2 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/14/input')
  const data = await response.text()
  const sections = data.split('\n\n')
  const template = sections[0].split('')
  const pairs = sections[1].split('\n').slice(0,-1)
       .map(line => line.split(' -> '))
       .reduce((ret, [pair, insert]) => {
         ret[pair] = insert
         return ret
       }, {})

  const pairsCount = Object.keys(pairs).reduce((ret, pair) => {
    ret[pair] = 0
    return ret
  }, {})

  for (let i=0; i<template.length-1; i++) {
    const pair = template[i] + template[i+1]
    pairsCount[pair]++
  }

  for (let n=0; n<40; n++) {
    const original = {...pairsCount}
    Object.entries(original).forEach(([pair, count]) => {
      const c1 = pair[0]
      const c2 = pair[1]
      const insert = pairs[pair]
      pairsCount[pair] -= count
      pairsCount[c1+insert] += count
      pairsCount[insert+c2] += count
    })
  }
 
  const countsMap = Object.entries(pairsCount).reduce((ret, [pair, count]) => {
    ret[pair[0]] = ret[pair[0]] ? ret[pair[0]]+count : count
    ret[pair[1]] = ret[pair[1]] ? ret[pair[1]]+count : count
    return ret
  }, {})

  const counts = Object.entries(countsMap).sort((o1, o2) => o2[1]-o1[1])
  const result = Math.ceil(counts[0][1]/2) - Math.ceil(counts[counts.length-1][1]/2)
  console.log(result)
}

day14part2()
