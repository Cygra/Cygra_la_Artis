class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

class LList {
  constructor() {
    this.head = new Node("head")
    this.head.next = this.head
  }

  find(item) {
    let currentNode = this.head
    while (currentNode.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  insert(newEle, item) {
    let newNode = new Node(newEle)
    let currentNode = this.find(item)
    newNode.next = currentNode.next
    newNode.prev = currentNode
    currentNode.next = newNode
  }

  // findPrev(item) {
  //   let currentNode = this.head
  //   while (currentNode.next !== null && currentNode.next.element !== item) {
  //     currentNode = currentNode.next
  //   }
  //   return currentNode
  // }

  findLast() {
    var currentNode = this.head
    while (currentNode.next.element !== "head") {
      currentNode = currentNode.next
    }
    return currentNode
  }

  remove(item) {
    let currentNode = this.find(item)
    if (currentNode.next.element !== "head") {
      currentNode.prev.next = currentNode.next
      currentNode.next.prev = currentNode.prev
    } else {
      currentNode.prev.next = this.head
    }
    currentNode.next = null
    currentNode.prev = null
  }

  display() {
    let currentNode = this.head
    while (currentNode.next.element !== "head") {
      console.log(currentNode.next.element)
      currentNode = currentNode.next
    }
  }

  disReverse() {
    let currentNode = this.findLast()
    while (currentNode.prev !== null) {
      console.log(currentNode.element)
      currentNode = currentNode.prev
    }
  }
}

let cities = new LList()
cities.insert("Conway1", "head")
cities.insert("Conway2", "Conway1")
cities.insert("Conway3", "Conway2")
cities.insert("Conway4", "Conway3")
cities.display()
cities.remove("Conway3")
cities.display()
cities.disReverse()
