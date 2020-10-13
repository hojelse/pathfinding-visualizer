import { Edge } from "./Edge";
import { LinkedList } from "./LinkedList";

// Graph implemented with an adjacency list
export class Graph {
  V: number; // number of verticies
  adjacencyList: LinkedList<Edge>[] = [];

  constructor(V: number) {
    this.V = V;
    for (let i = 0; i < V; i++) this.adjacencyList[i] = new LinkedList();
  }

  addEdge(from: number, to: number, weight: number = 1) {
    let edge: Edge = new Edge(from, to, weight);
    this.adjacencyList[from].add(edge);
  }

  getNeigborhoodOf(vertex: number) {
    return this.adjacencyList[vertex];
  }

  [Symbol.iterator](): GraphIterator {
    return new GraphIterator(this);
  }
}

class GraphIterator implements Iterator<number> {
  i: number = 0;
  graph: Graph

  constructor(graph: Graph) {
    this.graph = graph;
  }

  next(): IteratorResult<number> {
    let adjacencyList = this.graph.adjacencyList;
    return {
      done: this.i === adjacencyList.length,
      value: this.i++,
    }
  }
}

