import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++;

    if (i > 5) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i) + "\n")
      
      setTimeout(() => {
        this.push(buf)
      }, 1000)
    }
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(res => res.text().then(data => console.log(data)))