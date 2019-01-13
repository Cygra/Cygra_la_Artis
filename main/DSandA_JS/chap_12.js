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
}

function swap(arr, index1, index2) {
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

let nums = new CArray(10)
nums.setData()
nums.bubbleSort()
