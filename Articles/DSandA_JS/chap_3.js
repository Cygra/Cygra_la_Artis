class List {
  constructor() {
    this.dataStore = []
    this.listSize = 0
  }

  append(e) {
    this.dataStore[this.listSize++] = e
  }

  find(e) {
    const len = this.dataStore.length
    for (let i = 0; i < len; i++) {
      if (this.dataStore[i] === e) return i
    }
    return -1
  }

  length() {
    return this.listSize
  }

  remove(e) {
    const index = this.find(e)
    if (index > -1) {
      this.dataStore.splice(index, 1)
      --this.listSize
      return true
    }
    return false
  }
}

let names = new List()
names.append('a')
names.append('s')
names.append('d')
names.append('f')
console.log(names)
names.remove("a")
console.log(names)

// nothing interesting
