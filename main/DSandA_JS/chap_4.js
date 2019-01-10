class Stack {
  constructor() {
    this.dataStore = []
    this.top = 0
  }

  push(e) {
    this.dataStore[this.top ++] = e
  }

  pop() {
    return this.dataStore[-- this.top]
  }

  peek() {
    return this.dataStore[this.top - 1]
  }

  length() {
    return this.top
  }

  clear() {
    this.top = 0
  }
}

function mulBase(num, base) {
  let s = new Stack()
  do {
    s.push(num % base)
    num = Math.floor(num / base)
  } while (num > 0)
  let converted = ""
  while (s.length() > 0) {
    converted += s.pop()
  }
  return converted
}

console.log(mulBase(1024, 2))
console.log(mulBase(125, 8))

function isPalindrome(word) {
  let s = new Stack()
  const len = word.length
  for (let i = 0; i < len; i ++) {
    s.push(word[i])
  }
  let rword = ''
  while (s.length() > 0) {
    rword += s.pop()
  }
  if (word === rword) {
    return true
  } else {
    return false
  }
}

let word1 = "hello"
let word2 = "racecar"

console.log(isPalindrome(word1))
console.log(isPalindrome(word2))

function factorial(n) {
  var s = new Stack()
  while (n > 1) {
    s.push(n --)
  }
  let result = 1
  while (s.length() > 0) {
    result *= s.pop()
  }
  return result
}

console.log(factorial(5))

function isVaild(string) {
  var s = new Stack()
  const len = string.length
  for (let i = 0; i < len; i ++) {
    const cur = string[i]
    if (cur === "(") {
      s.push(cur)
    } else if (cur === ")") {
      s.pop()
    }
  }
  return s.length() === 0
}

console.log(isVaild("hfdjlka(jfkda;"))
console.log(isVaild("hfdjlka(jfkda;)fjkal;j"))
