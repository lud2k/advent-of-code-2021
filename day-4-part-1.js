class Board {
  constructor(numsText) {
    this.grid = []
    this.locations = {}
    this.size = 5
    this.won = false
    this.grid = numsText.split(/[ \n]/).filter(item => !!item).map(item => ({ marked: false, num: parseInt(item, 10) }))
    this.grid.forEach((item, index) => this.locations[item.num] = index)
  }

  mark(num) {
    const index = this.locations[num]
    if (index !== undefined) {
      this.grid[index].marked = true

      // check if won
      const col = index % this.size
      const row = Math.floor(index / this.size)
      this.won |= this.grid.slice(row*this.size,(row+1)*this.size).every(item => item.marked)
      this.won |= Array(this.size).fill().map((_, i) => this.grid[col + i * this.size]).every(item => item.marked)
    }
  }

  sumUnmarked() {
    return this.grid.filter(item => !item.marked).reduce((ret, item) => ret + item.num, 0) 
  }
}

const day4part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/4/input')
  const data = await response.text()
  const sections = data.split('\n\n').slice(0,-1)
  const drawn = sections[0].split(',')
  const boards = sections.slice(1).map(section => new Board(section))
  for (num of drawn) {
    for (board of boards) {
      board.mark(num)
      if (board.won) {
        console.log('result', board.sumUnmarked() * num)
        return
      }
    }
  }
}

day4part1()
