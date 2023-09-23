// Buffer is a representation of allocated memory (binary hexadecimal)
// more performatic to read and write, utilized by streams

const buffer = Buffer.from('hello')

console.log(buffer) // <Buffer 68 65 6c 6c 6f> HEX
console.log(buffer.toJSON()) // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] } DEC