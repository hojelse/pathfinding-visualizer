import { Edge } from "./Edge";
import { Graph } from "./Graph";
import { MinPQ } from "./PriorityQueue";

// Pathfinding algorithm Dijkstra that runs on a Graph
export class Dijkstra {
  distTo: number[];
  edgeTo: Edge[];
  pq: MinPQ;
  history: DijkstraState[];

  constructor(graph: Graph, startVertex: number) {
    this.edgeTo = new Array<Edge>(graph.V);
    this.distTo = new Array<number>(graph.V);
    this.pq = new MinPQ(graph.V);
    this.history = [];
    this.writeToHistory();

    for (let v = 0; v < graph.V; v++) this.distTo[v] = Infinity;
    this.distTo[startVertex] = 0;

    this.pq.insert(startVertex, 0);
    while (!this.pq.isEmpty()) {
      this.relax(graph, this.pq.popMin());
      this.writeToHistory();
    };
    console.log(this.history);

  }

  relax(graph: Graph, fromVertex: number) {
    for (const edge of graph.getNeigborhoodOf(fromVertex)) {
      let toVertex: number = edge.to;
      if (this.distTo[toVertex] > this.distTo[fromVertex] + edge.weight) {
        this.distTo[toVertex] = this.distTo[fromVertex] + edge.weight;
        this.edgeTo[toVertex] = edge;
        if (this.pq.contains(toVertex)) this.pq.changeKey(toVertex, this.distTo[toVertex]);
        else this.pq.insert(toVertex, this.distTo[toVertex]);
      }
    }
  }

  getDistTo(vertex: number): number {
    return this.distTo[vertex];
  }

  hasPathTo(vertex: number) {
    return this.distTo[vertex] < Infinity;
  }

  getPathTo(vertex: number): Array<Edge> {
    if (!this.hasPathTo(vertex)) return null;
    let path = new Array<Edge>();
    for (let edge = this.edgeTo[vertex]; edge != null; edge = this.edgeTo[edge.from]) {
      path.push(edge);
    }
    return path;
  }

  writeToHistory() {
    let state = new DijkstraState(this.distTo, this.edgeTo, this.pq);
    this.history.push(state);
  }

}

class DijkstraState {
  distTo: number[];
  edgeTo: Edge[];
  pq: MinPQ;

  constructor(distTo: number[], edgeTo: Edge[], pq: MinPQ) {
    this.distTo = distTo;
    this.edgeTo = edgeTo;
    this.pq = pq;
  }
}