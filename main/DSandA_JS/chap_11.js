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
        point && console.log(point)
      }
      console.log('\n')
    }
  }
}

var g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
g.showGraph()
console.log(g)
