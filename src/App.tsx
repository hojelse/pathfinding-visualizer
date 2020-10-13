import React, { useRef, useState, useEffect } from "react"
import "./App.css"
import { Graph } from "./Dijkstra/Graph"

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
  let graph = new Graph(3)
  graph.addEdge(0, 1)
  graph.addEdge(0, 2)
  graph.addEdge(1, 2)

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
      <circle className="vertex" cx="0" cy="0" />
      <circle className="vertex" cx="30" cy="0" />
      <circle className="vertex" cx="30" cy="40" />
    </svg>
  )
}

export default App
