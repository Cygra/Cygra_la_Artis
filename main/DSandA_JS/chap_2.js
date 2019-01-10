// 数组在 JavaScript 中只是一种特殊的对象，所以效率上不如其他语言的数组高。

// https://github.com/Cygra/Cygra_la_Artis/issues/11

Array.matrix = (numRows, numCols, initial) => {
  let arr = []
  for (let i = 0; i < numRows; ++i) {
    let cols = []
    for(let j = 0; j < numCols; ++j) {
      cols[j] = initial
    }
    arr[i] = cols
  }
  return arr
}

console.log(Array.matrix(3,3,''))

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let p1 = new Point(1,2)
let p2 = new Point(3,4)
let pointArr = [p1, p2]
console.log(pointArr)

class weekTemps {
  constructor() {
    this.dataStore = []
  }

  add(temp) {
    this.dataStore.push(temp)
  }

  averge() {
    let total = 0
    const len = this.dataStore.length
    for (let i = 0; i < len; ++i) {
      total += this.dataStore[i]
    }
    return total / len
  }
}

let thisWeek = new weekTemps()
thisWeek.add(1)
thisWeek.add(2)
thisWeek.add(3)
thisWeek.add(5)
console.log(thisWeek.averge())
