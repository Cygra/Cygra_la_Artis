class Dict {
  constructor() {
    this.dataStore = new Array()
  }

  add(key, value) {
    this.dataStore[key] = value
  }

  find(key) {
    return this.dataStore[key]
  }

  remove(key) {
    delete this.dataStore[key]
  }

  count() {
    return Object.keys(this.dataStore).length
  }

  clear() {
    let that = this
    Object.keys(this.dataStore).forEach(function(k) {
      delete that.dataStore[k]
    })
  }
}

let dict = new Dict()
dict.add("Mike1", 100)
dict.add("Mike2", 200)
dict.add("Mike3", 300)
console.log(dict)
dict.remove("Mike2")
console.log(dict.count())
dict.clear()
console.log(dict)
