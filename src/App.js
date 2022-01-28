import "./App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"

function App() {
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("white");

  return (
    <>
      <div className="lobby">
        <Pallete
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
        />
        <div className="chalkboard">
          <div className="chalkboard-text-arrow"/>
          <div className="chalkboard-text-url"/>
          <Canvas
            lineWidth={lineWidth}
            lineColor={lineColor}
          />
        </div>
      </div>
    </>
  );
}

export default App;
