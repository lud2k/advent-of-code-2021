const sumVersions = (packet) => {
  let ret = packet.version
  if (packet.packets) {
    for (let subPacket of packet.packets) {
      ret += sumVersions(subPacket)
    }
  } 
  return ret   
}

const parsePackets = (reader) => {
  const version = reader.read(3)
  const type = reader.read(3)
  const ret = { version, type }
  if (type === 4) {
    // get by 5 bits until leading by 0
    let label = 1
    let val = 0 
    while (label === 1) {
      label = reader.read(1)
      const v = reader.read(4)
      val = val << 4 | v
   }
   ret.value = val
  } else {
    ret.packets = []
    const label = reader.read(1)
    if (label === 0) {
      // get by 15 bit, num of bits in packet
      const nbBitsInSubPacket = reader.read(15)
      const start = reader.index
      while (reader.index < start + nbBitsInSubPacket) {
        ret.packets.push(parsePackets(reader))
      }
    } else {
      // get by 11 bits, num of subpacket
      const nbSubPacket = reader.read(11)
      for (let i=0; i<nbSubPacket; i++) {
        ret.packets.push(parsePackets(reader))
      }
    }
  }
  return ret
}

class Reader {
  constructor(bits) {
    this.bits = bits
    this.index = 0
  }
  
  read(n) {
    const ret = this.bits.slice(this.index, this.index+n)
    this.index += n
    return parseInt(ret, 2)
  }
}

const day16part1 = async () => {
  const response = await fetch('https://adventofcode.com/2021/day/16/input')
  const data = await response.text()
  const data2 = `A0016C880162017C3686B18A3D4780
`
  const hexs = data.split('\n')[0]
  const bits = hexs.split('').map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('')
  const reader = new Reader(bits)

  const packet = parsePackets(reader)
  const sum = sumVersions(packet)
  console.log('sum', sum)
}

day16part1()
