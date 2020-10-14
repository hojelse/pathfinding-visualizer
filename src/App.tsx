import React, { useRef, useState, useEffect } from "react"
import "./App.css"
import { Edge } from "./Dijkstra/Edge"
import { Graph } from "./Dijkstra/Graph"
import { UndirectedGraph } from "./Dijkstra/UndirectedGraph"

let App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px",
      }}
    >
      <GraphTracer></GraphTracer>
    </div>
  )
}

let GraphTracer = () => {
  let n = 3;

  let graph = new UndirectedGraph(n);
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);


  let vertexPositions = [
    { x: 0, y: 0 },
    { x: 30, y: 0 },
    { x: 30, y: 40 },
  ]

  for (let i = 0; i < n; i++) {
    for (const edge of graph.getNeigborhoodOf(i)) {
      let from = vertexPositions[edge.from];
      let to = vertexPositions[edge.to];
      return <path className="edge" d={`M${from.x},${from.y} L ${to.x},${to.y}`} />
    }
  }

  return (
    <svg
      viewBox="-100 -100 200 200"
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid white",
      }}
    >
      <path className="edge" d="M0,0 L 30,0" />
      <path className="edge" d="M30,0 L 30,40" />
      <path className="edge" d="M30,40 L 0,0" />
      {[...vertexPositions].map((point, i) => {
        return <circle className="vertex" cx={point.x} cy={point.y} />
      })}
    </svg>
  )
}

export default App
