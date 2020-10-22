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
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/javascript/javascript"
import { Controlled as ControlledCodeTracer } from "react-codemirror2"

let App = () => {
  const [js, setJs] = useState("")

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <GraphTracer></GraphTracer>
      <CodeTracer
        language="javascript"
        value={js}
        contentSetter={setJs}
        onChange={setJs}
      ></CodeTracer>
    </div>
  )
}

let CodeTracer = (props) => {
  const { language, value, contentSetter, onChange } = props

  function handleChange(editor, data, value) {
    // onChange(value)
  }

  contentSetter(dijkstraCode)

  return (
    <div className="editor-container">
      <ControlledCodeTracer
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
      <DebuggerInterface />
    </div>
  )
}

let DebuggerInterface = () => {
  const [playing, setPlaying] = React.useState(false)
  const [step, setStep] = React.useState(5)
  const [steps, setSteps] = React.useState(10)

  let handleInputChange = (evt) => {
    setStep(evt.currentTarget.value)
  }

  let handlePlay = () => {
    setPlaying(!playing)
  }

  return (
    <>
      <div className="debugger-interface">
        <button onClick={handlePlay} className="debugger-button">
          {playing ? "pause" : "play"}
        </button>
        <input
          className="debugger-scrubber"
          onInput={handleInputChange}
          type="range"
          value={step}
          min="1"
          max={steps}
        />
        <button className="debugger-button">
          Step {step} / {steps}
        </button>
      </div>
      <div className="debugger-interface">
        <button className="debugger-button">step-over</button>
        <button className="debugger-button">step-into</button>
        <button className="debugger-button">step-out</button>
      </div>
    </>
  )
}

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
        flexGrow: 1,
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

class GraphTracerDelaunayVoronoi extends Component {
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
    const points = []
    // for (let i = 0; i < 100; i++) {
    //   points.push([
    //     Math.floor(Math.random() * 1000),
    //     Math.floor(Math.random() * 1000),
    //   ])
    // }

    for (let i = 0; i < 1000; i += 100) {
      for (let j = 0; j < 1000; j += 100) {
        points.push([i, j])
      }
    }

    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, 1000, 1000])

    const context = this.myRef.current.getContext("2d")

    // Voronoi diagram
    // == Points ==
    context.beginPath()
    delaunay.renderPoints(context)
    context.fillStyle = "white"
    context.fill()

    // == Border ==
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

let dijkstraCode = `export class Dijkstra {
  distTo: number[];
  edgeTo: Edge[];
  pq: MinPQ;

  constructor(graph: Graph, startVertex: number) {
    this.edgeTo = new Array<Edge>(graph.V);
    this.distTo = new Array<number>(graph.V);
    this.pq = new MinPQ(graph.V);

    for (let v = 0; v < graph.V; v++) this.distTo[v] = Infinity;
    this.distTo[startVertex] = 0;

    this.pq.insert(startVertex, 0);
    while (!this.pq.isEmpty()) {
      this.relax(graph, this.pq.popMin());
    };

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
}`
