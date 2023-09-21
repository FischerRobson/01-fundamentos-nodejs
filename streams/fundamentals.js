// stdin: recives terminal input
// stdout: print in terminal input
// pipe: connect streams

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1

  // return data from the stream
  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i) + "\n")
      
      setTimeout(() => {
        this.push(buf)
      }, 1000)
    }
  }
}

class MultipleByThenStream extends Writable { 
  
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) { 
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(transformed.toString()))
  }
}

// new OneToHundredStream().pipe(process.stdout);

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultipleByThenStream());