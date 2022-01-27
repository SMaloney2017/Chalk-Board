import "./App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"

function App() {
  const [lineWidth, setLineWidth] = useState(1);
  const [lineColor, setLineColor] = useState("white");

  return (
    <div className="canvasWrapper">
      <Pallete
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
      />
      <Canvas
        lineWidth={lineWidth}
        lineColor={lineColor}
      />
    </div>
  );
}

export default App;
