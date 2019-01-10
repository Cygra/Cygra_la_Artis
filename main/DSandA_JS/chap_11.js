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
      this.adj[qs] !== undefined && console.log(`[${qs}] visited`)
      this.adj[qs].forEach(i => {
        !this.marked[i] && (this.marked[i] = true) && queue.push(i)
      })
    }
  }
}

var g = new Graph(5)
g.addEdge(0, 3)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
g.showGraph()
g.bfs(0)
console.log(g)
