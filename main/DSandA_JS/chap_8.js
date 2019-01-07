class HashTable {
  constructor() {
    this.table = new Array(137)
  }

  simpleHash(data) {
    let total = 0
    let len = data.length
    for (let i = 0; i < len; i ++) {
      total += 37 * total + data.charCodeAt(i)
    }
    return parseInt(total % this.table.length)
  }

  put(data) {
    let pos = this.simpleHash(data)
    if (this.table[pos] !== undefined) {
      this.table[pos] = this.table[pos] + ',' + data
    } else {
      this.table[pos] = data
    }
  }

  showDistro() {
    let len = this.table.length
    for (let i = 0; i < len; i ++) {
      if (this.table[i] !== undefined) {
        console.log(`${i}: ${this.table[i]}`)
      }
    }
  }
}

let h = new HashTable()
;[ 'akjg', 'bbvcx', 'crte', 'shgf' ].forEach(function(i) { h.put(i) })
h.showDistro()
