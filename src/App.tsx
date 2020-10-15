import React, { useRef, useState, useEffect } from "react"
import "./App.css"
import { Dijkstra } from "./Dijkstra/Dijkstra"
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
  let vertexPoints = squareLattice3x3
  let relations = relationsForSquareLattice3x3

  let graph = new UndirectedGraph(vertexPoints.length)
  relations.map((relation) => graph.addEdge(relation.a, relation.b))

  return (
    <svg
      viewBox="-100 -100 200 200"
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid white",
      }}
    >
      {[...createDOMEdges(graph, vertexPoints)]}
      {[...createDOMVertices(vertexPoints)]}
    </svg>
  )
}

let Edge = (props) => {
  return (
    <path
      className="edge"
      d={`M${props.from.x},${props.from.y} L ${props.to.x},${props.to.y}`}
    />
  )
}

let Vertex = (props) => {
  return <circle className="vertex" cx={props.point.x} cy={props.point.y} />
}

export default App

const squareLattice3x3 = [
  { x: -50, y: -50 },
  { x: 0, y: -50 },
  { x: 50, y: -50 },
  { x: -50, y: 0 },
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: -50, y: 50 },
  { x: 0, y: 50 },
  { x: 50, y: 50 },
]

const relationsForSquareLattice3x3 = [
  { a: 0, b: 1 },
  { a: 1, b: 2 },
  { a: 0, b: 3 },
  { a: 1, b: 4 },
  { a: 2, b: 5 },
  { a: 3, b: 4 },
  { a: 4, b: 5 },
  { a: 3, b: 6 },
  { a: 4, b: 7 },
  { a: 5, b: 8 },
  { a: 6, b: 7 },
  { a: 7, b: 8 },
]

function createDOMVertices(vertexPoints: { x: number; y: number }[]) {
  return vertexPoints.map((point) => <Vertex point={point}></Vertex>)
}

function* createDOMEdges(
  graph: UndirectedGraph,
  vertexPositions: { x: number; y: number }[]
) {
  for (let i = 0; i < vertexPositions.length; i++) {
    for (const edge of graph.getNeigborhoodOf(i)) {
      let from = vertexPositions[edge.from]
      let to = vertexPositions[edge.to]
      yield (<Edge from={from} to={to} />)
    }
  }
}
