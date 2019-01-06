// https://www.cs.usfca.edu/~galles/visualization/BST.html

class Node {
  constructor(data, left, right) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(data) {
    let n = new Node(data, null, null)
    if (this.root === null) {
      this.root = n
    } else {
      let current = this.root
      let parent
      while (true) {
        parent = current
        if (data < current.data) {
          current = current.left
          if (current === null) {
            parent.left = n
            break
          }
        } else {
          current = current.right
          if (current === null) {
            parent.right = n
            break
          }
        }
      }
    }
  }

  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left)
      console.log(node.data)
      this.inOrder(node.right)
    }
  }

  preOrder(node) {
    if (node !== null) {
      console.log(node.data)
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  postOrder(node) {
    if (node !== null) {
      this.postOrder(node.left)
      this.postOrder(node.right)
      console.log(node.data)
    }
  }

  getMin(node) {
    let current = node || this.root
    while (current.left !== null) {
      current = current.left
    }
    return current.data
  }

  getMax(node) {
    let current = node || this.root
    while (current.right !== null) {
      current = current.right
    }
    return current.data
  }

  find(data) {
    let current = this.root
    while (current !== null) {
      if (current.data === data) {
        return(current)
      } else if (current.data < data) {
        current = current.right
      } else {
        current = current.left
      }
    }
    return null
  }

  remove(data) {
    removeNode(this.root, data)
  }

  // 若待删除的节点包含两个子节点，要么查找待删除节点左子树上的最大值，要么查找右子树上的最小值，此处选后一种
  removeNode(node, data) {
    if (node === null) {
      return null
    }
    if (data === node.data) {
      // 没有子节点
      if (node.left === null && node.right === null) {
        // 父节点指向这个节点的链接指向 null
      }
      // 没有左子节点
      if (node.left === null) {
        return node.right
      }
      // 没有右子节点
      if (node.right === null) {
        return node.left
      }
      let tempNode = this.getMin(node.right)
      node.data = tempNode.data
      node.right = this.removeNode(node.right, tempNode.data)
      return node
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data)
      return node
    } else {
      node.right = removeNode(node.right, data)
      return node
    }
  }
}

let nums = new BST()
nums.insert(654)
nums.insert(1)
nums.insert(76)
nums.insert(5)
nums.insert(345)
nums.insert(63)
nums.insert(32)
// nums.inOrder(nums.root)
// nums.preOrder(nums.root)
// nums.postOrder(nums.root)
console.log(nums.getMin())
console.log(nums.getMax())
console.log(nums.find(76))
