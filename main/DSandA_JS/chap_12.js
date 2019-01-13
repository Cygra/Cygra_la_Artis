class CArray {
  constructor(num) {
    this.dataStore = [...new Array(num)].map(i => i)
    this.pos = 0
    this.num = num
  }

  setData() {
    for (let i = 0; i < this.num; i ++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.num + 1))
    }
  }

  clear() {
    this.dataStore.map(() => 0)
  }

  insert(ele) {
    this.dataStore[this.pos ++] = ele
  }

  toString() {
    console.log(this.dataStore.join('-'))
  }


  bubbleSort() {
    for (let outer = this.dataStore.length; outer >= 2; outer --) {
      for (let inner = 0; inner <= outer - 1; inner ++) {
        this.dataStore[inner] > this.dataStore[inner + 1] && swap(this.dataStore, inner, inner + 1)
      }
      this.toString()
    }
  }

  selectionSort() {
    let len = this.dataStore.length
    let min
    for (let outer = 0; outer < len; outer ++) {
      min = outer
      for (let inner = outer + 1; inner < len; inner ++) {
        this.dataStore[inner] < this.dataStore[min] && (min = inner)
      }
      swap(this.dataStore, outer, min)
      this.toString()
    }
  }

  insertSort() {
    let temp
    let inner
    let len = this.dataStore.length
    for (let outer = 1; outer < len; outer ++) {
      temp = this.dataStore[outer]
      inner = outer
      while (inner > 0 && this.dataStore[inner - 1] >= temp) {
        this.dataStore[inner] = this.dataStore[inner - 1]
        inner --
      }
      this.dataStore[inner] = temp
      this.toString()
    }
  }
}

function swap(arr, index1, index2) {
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

let nums = new CArray(10)
nums.setData()
nums.insertSort()
nums.toString()
