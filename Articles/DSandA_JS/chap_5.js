class Queue {
  constructor() {
    this.dataStore = []
  }

  enqueue(e) {
    this.dataStore.push(e)
  }

  dequeue() {
    // return this.dataStore.shift()
    let entry = 0
    let len = this.dataStore.length
    for (var i = 0; i < len; i ++) {
      if (this.dataStore[i].code < this.dataStore[entry].code) {
        entry = i
      }
    }
    return this.dataStore.splice(entry, 1)
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

function distribute(nums, queues, n, digit) {
  for (let i = 0; i < n; i ++) {
    if (digit === 1) {
      queues[nums[i] % 10].enqueue(nums[i])
    } else {
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
    }
  }
}

function collect(queues, nums) {
  let i = 0
  for (let digit = 0; digit < 10; digit ++) {
    while (!queues[digit].isEmpty()) {
      nums[i ++] = queues[digit].dequeue()
    }
  }
}

let queues = []
for (let i = 0; i < 10; i ++) {
  queues[i] = new Queue()
}
let nums = []
for (let i = 0; i < 10; i ++) {
  nums[i] = Math.floor(Math.floor(Math.random() * 101))
}

console.log(nums)
distribute(nums, queues, 10, 1)
collect(queues, nums)
console.log(nums)
distribute(nums, queues, 10, 10)
collect(queues, nums)
console.log(nums)

class Patient {
  constructor(name, priority) {
    this.name = name
    this.code = priority
  }
}

let p1 = new Patient("AAA1", 1)
let p2 = new Patient("AAA2", 0)
let p3 = new Patient("AAA3", 2)
let p4 = new Patient("AAA4", 2)
let p5 = new Patient("AAA5", 2)
let p6 = new Patient("AAA6", 1)
let patients = new Queue()
patients.enqueue(p1)
patients.enqueue(p2)
patients.enqueue(p3)
patients.enqueue(p4)
patients.enqueue(p5)
patients.enqueue(p6)
console.log(patients)
console.log(patients.dequeue())
console.log(patients.dequeue())
console.log(patients.dequeue())
console.log(patients.dequeue())
console.log(patients.dequeue())
console.log(patients.dequeue())
