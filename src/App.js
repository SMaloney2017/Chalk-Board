import "./CSS/App.css";
import React, { useState, useEffect } from "react";
import Canvas from "./Components/Canvas/Canvas.js";
import Pallete from "./Components/Pallete/Pallete.js";
import Channel from "./Components/Channel/Channel.js";

function App() {
  const [chalkboardColor, setChalkboardColor] = useState("#354d42");
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [globalCompositeOperation, setGlobalCompositeOperation] = useState("source-over");
  const [lineWidth, setLineWidth] = useState(3);
  const [id, setId] = useState("");

  const getExtension = (url) => {
    setId(url.pathname.slice(1));
  };

  useEffect(() => {
    getExtension(window.location);
  }, []);

  return (
    <>
      <div id="lobby">
        <Channel id={id} />
        <Canvas
          chalkboardColor={chalkboardColor}
          strokeStyle={strokeStyle}
          globalCompositeOperation={globalCompositeOperation}
          lineWidth={lineWidth}
          id={id}
        />
        <Pallete
          setChalkboardColor={setChalkboardColor}
          setStrokeStyle={setStrokeStyle}
          setGlobalCompositeOperation={setGlobalCompositeOperation}
          setLineWidth={setLineWidth}
          id={id}
        />
      </div>
    </>
  );
}

export default App;