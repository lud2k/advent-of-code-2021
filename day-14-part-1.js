const day14part1 = async () => {
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

  for (let n=0; n<10; n++) {
    for (let i=0; i<template.length-1; i+=2) {
      const pair = template[i] + template[i+1]
      const insert = pairs[pair]
      template.splice(i+1, 0, insert)
    }
  }

  const countsMap = template.reduce((ret, c) => {
    if (!ret[c]) {
      ret[c] = 0
    }
    ret[c]++
    return ret
  }, {})
  const counts = Object.entries(countsMap).sort((o1, o2) => o2[1]-o1[1])
  const result = counts[0][1] - counts[counts.length-1][1]
  console.log(result)
}

day14part1()
