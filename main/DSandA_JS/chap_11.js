class Vertex {
  constructor(label, wasVisited) {
    this.label = label
    this.wasVisited = wasVisited
  }
}

class Graph {
  constructor(v) {
    this.vertices = v
    this.edges = 0
    this.adj = [...new Array(v)].map(i => [])
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
}

var g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(1, 2)
g.addEdge(2, 3)
g.addEdge(3, 4)
g.addEdge(1, 4)
g.bfs(0)
console.log(g)

let paths = g.pathTo(4)
console.log(paths)
