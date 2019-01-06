class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LList {
  constructor() {
    this.head = new Node("head")
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
    currentNode.next = newNode
  }

  findPrev(item) {
    let currentNode = this.head
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  remove(item) {
    var prevNode = this.findPrev(item)
    prevNode.next !== null && (prevNode.next = prevNode.next.next)
  }

  display() {
    let currentNode = this.head
    while (currentNode.next !== null) {
      console.log(currentNode.next.element)
      currentNode = currentNode.next
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
