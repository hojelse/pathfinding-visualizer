import React, { useState } from "react"
import "./App.css"

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* rows and columns must be uneven */}
      <Board showMST={true} rows={9} columns={9} />
    </div>
  )
}

function Board({ rows, columns }: any) {
  return (
    <div
      style={{
        height: "100vmin",
        width: "100vmin",
        position: "relative",
        backgroundColor: "#222222",
        boxShadow: "0 10px 20px -7px #00000044",
        transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
      }}
    >
      {/* Nodes */}
      <div
        style={{
          padding: "20px",
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateColumns: [...new Array(columns)]
            .map((_, i) => (i % 2 == 0 ? "10fr" : "minmax(5px, 1fr)"))
            .join(" "),
          gridTemplateRows: [...new Array(rows)]
            .map((_, i) => (i % 2 == 0 ? "10fr" : "minmax(5px, 1fr)"))
            .join(" "),
          alignItems: "center",
          justifyItems: "center",
          // gap: "10px",
        }}
      >
        {[...new Array(rows * columns)].map((_, i) => {
          const isOddRow = i % (rows * 2) < rows
          const isOddCol = (i % columns) % 2 == 0
          if (isOddCol && isOddRow) return <Node key={i} />
          if (!isOddCol != !isOddRow) {
            if (isOddCol) return <Edge key={i} vertical={true} />
            return <Edge key={i} vertical={false} />
          }
          return <Gap key={i} />
        })}
      </div>
    </div>
  )
}

function Node() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#383838",
      }}
    ></div>
  )
}

function Edge({ vertical }) {
  return (
    <div
      className={vertical ? "edgeVertical" : "edgeHorizontal"}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#2d2d2d",
      }}
    ></div>
  )
}

function Gap() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  )
}

function createInitialState(rowsCount: number, cols: number) {
  // [new Array(rowsCount)]
}

export default App
