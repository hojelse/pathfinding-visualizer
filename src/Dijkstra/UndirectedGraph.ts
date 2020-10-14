import { Graph } from "./Graph";

export class UndirectedGraph extends Graph {
  addEdge(from: number, to: number, weight: number = 1) {
    super.addEdge(from, to, weight);
    super.addEdge(to, from, weight);
  }
}

