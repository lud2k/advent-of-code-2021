const executeOperations = (packet) => {
  if (packet.type === 0) {
    return packet.packets.reduce((ret, packet) => ret + executeOperations(packet), BigInt(0))
  } else if (packet.type === 1) {
    return packet.packets.reduce((ret, packet) => ret * executeOperations(packet), BigInt(1))
  } else if (packet.type === 2) {
    return packet.packets.reduce((ret, packet) => ret >  executeOperations(packet) ? executeOperations(packet) : ret, BigInt(Number.MAX_VALUE))
  } else if (packet.type === 3) {
    return packet.packets.reduce((ret, packet) => ret < executeOperations(packet) ? executeOperations(packet) : ret, BigInt(0))
  } else if (packet.type === 4) {
    return packet.value
  } else if (packet.type === 5) {
    return executeOperations(packet.packets[0]) > executeOperations(packet.packets[1]) ? BigInt(1) : BigInt(0)
  } else if (packet.type === 6) {
    return executeOperations(packet.packets[0]) < executeOperations(packet.packets[1]) ? BigInt(1) : BigInt(0)
  } else if (packet.type === 7) {
    return executeOperations(packet.packets[0]) === executeOperations(packet.packets[1]) ? BigInt(1) : BigInt(0)
  }
}

const parsePackets = (reader) => {
  const version = reader.read(3)
  const type = reader.read(3)
  const ret = { version, type }
  if (type === 4) {
    // get by 5 bits until leading by 0
    let label = 1
    let val = BigInt(0) 
    while (label === 1) {
      label = reader.read(1)
      const v = reader.read(4)
      val = val << BigInt(4) | BigInt(v)
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
  const hexs = data.split('\n')[0]
  const bits = hexs.split('').map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('')
  const reader = new Reader(bits)
  const packet = parsePackets(reader)
  const result = executeOperations(packet)
  console.log('result', result)
}

day16part1()
