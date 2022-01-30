import "./CSS/App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"

function App() {
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("white");

  return (
    <>
      <div className="lobby">
        <Canvas
          lineWidth={lineWidth}
          lineColor={lineColor}
        />
        <Pallete
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
        />
      </div>
    </>
  );
}

export default App;
