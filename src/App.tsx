import React, { useState } from "react"
import logo from "./logo.svg"
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
      <Board showMST={true} rows={8} columns={8} />
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
        transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
      }}
    >
      {/* Nodes */}
      <div
        style={{
          position: "absolute",
          height: "100vmin",
          width: "100vmin",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "10px",
          outline: "1px red solid",
        }}
      >
        {[...new Array(rows * columns)].map((_, i) => (
          <Node key={i} />
        ))}
      </div>
      {/* Edges */}
      <div
        style={{
          position: "absolute",
          height: "100vmin",
          width: "100vmin",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "10px",
        }}
      >
        {[...new Array(1)].map((_, i) => (
          // {[...new Array(rows * columns)].map((_, i) => (
          <EdgeContainer>
            <Edge direction="up" />
            <Edge direction="down" />
            <Edge direction="left" />
            <Edge direction="right" />
          </EdgeContainer>
        ))}
      </div>
    </div>
  )
}

function EdgeContainer({ children }) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {children}
    </div>
  )
}

function Edge({ direction }) {
  const dirToCSSDir = {
    up: "top",
    down: "bottom",
    left: "left",
    right: "right",
  }

  const dirToColor = {
    up: "white",
    down: "yellow",
    left: "red",
    right: "orange",
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "50%",

        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          ...(direction === "up" || direction === "down"
            ? {
                transform: "translateY(-50%)",
                width: "200px",
                height: "10px",
              }
            : {
                transform: "translateX(-50%)",
                width: "10px",
                height: "200px",
              }),
          [dirToCSSDir[direction]]: "200px",
          backgroundColor: dirToColor[direction],
        }}
      ></div>
    </div>
  )
}

function Row({ children }) {
  return <div>{children}</div>
}

function Node() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#eee",
      }}
    ></div>
  )
}

function createInitialState(rowsCount: number, cols: number) {
  // [new Array(rowsCount)]
}

export default App
