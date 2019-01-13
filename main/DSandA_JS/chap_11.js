class Vertex {
  constructor(label, wasVisited) {
    this.label = label
    this.wasVisited = wasVisited
  }
}

class Graph {
  constructor(v) {
    this.vertices = v
    this.verList = []
    this.edges = 0
    this.adj = [...new Array(v)].map(() => [])
    this.marked = Array(v).fill(false)
    this.edgeTo = []
  }

  addEdge(v, w) {
    this.adj[v].push(w)
    this.adj[w].push(v)
    this.edges ++
  }

  showGraph() {
    for (var i = 0; i < this.vertices; i ++) {
      console.log(`${i} -> `)
      for (var j = 0; j < this.vertices; j ++) {
        const point = this.adj[i][j]
        point !== undefined && console.log(point)
      }
      console.log('\n')
    }
  }

  showName() {
    let visited = []
    for (let i = 0; i < this.vertices; i ++) {
      console.log(this.verList[i] + '- >')
      visited.push(this.verList[i])
      for (let j = 0; j < this.verList[j]; j ++) {
        if (this.adj[i][j] !== undefined) {
          if (visited.indexOf(this.verList[j] < 0)) {
            console.log(this.verList[j] + '  ')
          }
        }
      }
      visited.pop()
    }
  }

  // 深度优先
  dfs(v) {
    this.marked[v] = true
    this.adj[v] && console.log(`[${v}] visited`)
    this.adj[v] && this.adj[v].forEach(i => {
      !this.marked[i] && this.dfs(i)
    });
  }

  // 广度优先
  bfs(v) {
    let queue = []
    this.marked[v] = true
    queue.push(v)
    while (queue.length > 0) {
      let qs = queue.shift()
      console.log(`qs${qs}`)
      this.adj[qs] !== undefined && console.log(`[${qs}] visited`)
      this.adj[qs].forEach(i => {
        if (!this.marked[i]) {
          this.marked[i] = true
          queue.push(i)
          console.log(`i${i}`)
          this.edgeTo[i] = qs
        }
      })
    }
  }

  pathTo(v) {
    let source = 0
    if (!this.hasPathTo(v)) {
      return undefined
    }
    let path = []
    for (let i = v; i !== source; i = this.edgeTo[i]) {
      path.push(i)
    }
    path.push(source)
    return path
  }

  hasPathTo(v) {
    return this.marked[v]
  }

  topSort() {
    let stack = []
    let visited = Array(this.vertices).fill(false)
    for (let i = 0; i < this.vertices; i ++) {
      !visited[i] && this.topSortHelper(i, visited, stack)
    }
    for (let i = 0; i < stack.length; i ++) {
      if (stack[i] !== undefined && stack[i] !== false) {
        console.log(this.verList[stack[i]])
      }
    }
  }

  topSortHelper(v, visited, stack) {
    visited[v] = true
    this.adj[v].forEach(i => {
      !visited[i] && this.topSortHelper(i, visited, stack)
    })
    stack.push(v)
  }
}

var g = new Graph(6)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(3, 5)
g.addEdge(2, 4)
g.verList = [
  "cs1",
  "cs2",
  "data structure",
  "asssembly lang",
  "operating sys",
  "alg",
]

g.topSort()
g.showName()
