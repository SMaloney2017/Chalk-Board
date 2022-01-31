import "./CSS/App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"

function App() {
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("white");
  const [chalkboardColor, setChalkboardColor] = useState("#354d42");

  return (
    <>
      <div className="lobby">
        <Canvas
          chalkboardColor={chalkboardColor}
          lineWidth={lineWidth}
          lineColor={lineColor}
        />
        <Pallete
          lineWidth={lineWidth}
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setChalkboardColor={setChalkboardColor}
        />
      </div>
    </>
  );
}

export default App;
