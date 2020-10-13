import { Graph } from "./Graph";

// Subclass of Graph
// where every node has a maximum of 4 outgoing and 4 ingoing edges
export class GridGraph extends Graph {
  rows: number;
  cols: number;

  constructor(state: string[][]) {
    super(state.length * state[0].length);
    this.rows = state.length;
    this.cols = state[0].length;
    this.setup();
  }

  setup() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.addOutEdges(col, row);
      }
    }
  }

  addOutEdges(col: number, row: number) {
    const leftEdge = (col == 0);
    const rightEdge = (col == this.cols - 1);
    const topEdge = (row == 0);
    const bottomEdge = (row == this.rows - 1);

    let currentNodeID = this.coordsToId(col, row);
    if (!topEdge) this.addEdge(currentNodeID, this.coordsToId(col, row - 1));
    if (!rightEdge) this.addEdge(currentNodeID, this.coordsToId(col + 1, row));
    if (!bottomEdge) this.addEdge(currentNodeID, this.coordsToId(col, row + 1));
    if (!leftEdge) this.addEdge(currentNodeID, this.coordsToId(col - 1, row));
  }

  coordsToId(col: number, row: number): number {
    return col + row * this.cols;
  }

  idToCoords(id: number): { col: number, row: number } {
    let col = id % this.cols;
    let row = Math.floor(id / this.cols);
    return { col: col, row: row };
  }

}