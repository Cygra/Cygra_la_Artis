class Queue {
  constructor() {
    this.dataStore = []
  }

  enqueue(e) {
    this.dataStore.push(e)
  }

  dequeue() {
    return this.dataStore.shift()
  }

  front() {
    return this.dataStore[0]
  }

  back() {
    return this.dataStore[this.dataStore.length - 1]
  }

  isEmpty() {
    return this.dataStore.length === 0
  }

  count() {
    return this.dataStore.length
  }
}

const danceArr = ['F Amy', 'M Paul', 'F Jane', 'M Peter', 'M Jack', 'F Laura', 'M Mike', 'M Jason', 'M Tim', 'F Alice']

class Dancer {
  constructor(name, sex) {
    this.name = name
    this.sex = sex
  }
}

function getDancers(males, females) {
  const len = danceArr.length
  for (let i = 0; i < len; i ++) {
    const dancer = danceArr[i].split(' ')
    const name = dancer[1]
    const sex = dancer[0]
    sex === 'F' ? males.enqueue(new Dancer(name, sex)) : females.enqueue(new Dancer(name, sex))
  }
}

function dance(males, females) {
  while (!females.isEmpty() && !males.isEmpty()) {
    let female = females.dequeue()
    let male = males.dequeue()
    console.log(`${female.name} ${male.name}`)
  }
}

let maleQ = new Queue()
let femaleQ = new Queue()
getDancers(maleQ, femaleQ)
dance(maleQ, femaleQ)

if (!maleQ.isEmpty()) console.log(`M ${maleQ.count()}`)
if (!femaleQ.isEmpty()) console.log(`F ${femaleQ.count()}`)
