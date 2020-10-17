import React, {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  Component,
} from "react"
import "./App.css"
import { Dijkstra } from "./Dijkstra/Dijkstra"
import { UndirectedGraph } from "./Dijkstra/UndirectedGraph"
import { Delaunay } from "d3-delaunay"
import * as d3 from "d3"

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
      <BarChart></BarChart>
    </div>
  )
}

class BarChart extends Component {
  myRef: React.RefObject<any>

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  render() {
    return (
      <>
        <canvas ref={this.myRef} width="1000" height="1000"></canvas>
      </>
    )
  }

  componentDidMount() {
    const points = [[250, 250]]
    for (let i = 0; i < 100; i++) {
      points.push([
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
      ])
    }

    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, 1000, 1000])

    const context = this.myRef.current.getContext("2d")

    // Voronoi diagram
    // == Borders ==
    context.beginPath()
    delaunay.renderPoints(context)
    context.fillStyle = "white"
    context.fill()

    // == Points ==
    context.beginPath()
    voronoi.render(context)
    context.strokeStyle = "grey"
    context.stroke()

    // Delaunay triangulation (graph)
    context.globalCompositeOperation = "darken"
    context.beginPath()
    delaunay.renderPoints(context)
    context.fillStyle = "grey"
    context.fill()
    context.strokeStyle = "white"
    for (let i = 0, n = delaunay.triangles.length / 3; i < n; ++i) {
      context.beginPath()
      delaunay.renderTriangle(i, context)
      context.stroke()
    }

    return context.canvas
  }
}

// let Canvas = () => {
//   const points = [
//     [0, 0],
//     [0, 1],
//     [1, 0],
//     [1, 1],
//   ]
//   const delaunay = Delaunay.from(points)
//   const voronoi = delaunay.voronoi([0, 0, 960, 500])

//   const canvasRef = React.useRef(null)
//   useEffect(() => {
//     let canvas = canvasRef.current
//     var context = canvas.getContext("2d")
//     delaunay.render(context)
//     delaunay.renderPoints(context)
//   })

//   return (
//     <canvas ref={canvasRef} height="500px" width="500px" id="canvas"></canvas>
//   )
// }

let GraphTracer = () => {
  let vertexPoints = hexagonalLattice1
  let relations = relationsForHexagonalLattice1

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

let l = 50
const hexagonalLattice1 = [
  { x: -1 * l, y: 0 },
  { x: 0 * l, y: 0 },
  { x: 1 * l, y: 0 },
  { x: -l / 2, y: (l / 2) * Math.sqrt(3) },
  { x: -l / 2, y: (-l / 2) * Math.sqrt(3) },
  { x: l / 2, y: (l / 2) * Math.sqrt(3) },
  { x: l / 2, y: (-l / 2) * Math.sqrt(3) },
]

const relationsForHexagonalLattice1 = [
  { a: 1, b: 0 },
  { a: 1, b: 2 },
  { a: 1, b: 3 },
  { a: 1, b: 4 },
  { a: 1, b: 5 },
  { a: 1, b: 6 },
  { a: 0, b: 4 },
  { a: 4, b: 6 },
  { a: 6, b: 2 },
  { a: 0, b: 3 },
  { a: 3, b: 5 },
  { a: 5, b: 2 },
]

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
