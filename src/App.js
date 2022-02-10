import "./CSS/App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js";
import Pallete from "./Components/Pallete/Pallete.js";
import Channel from "./Components/Channel/Channel.js";
import useSockets from "./Components/Hooks/useSockets.js";

function App() {
  const [chalkboardColor, setChalkboardColor] = useState("#354d42");
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [globalCompositeOperation, setGlobalCompositeOperation] = useState("source-over");
  const [lineWidth, setLineWidth] = useState(3);
  const [id, setId] = useState("");
  const {
    drawLines,
    messages,
    sendStrokes,
    resetStrokes,
    undoStrokes,
    redoStrokes,
    sendMessage,
  } = useSockets(id);

  return (
    <>
      <div id="lobby">
        <Channel 
          setId={setId}
          messages={messages}
          sendMessage={sendMessage}
        />
        <Canvas
          chalkboardColor={chalkboardColor}
          strokeStyle={strokeStyle}
          globalCompositeOperation={globalCompositeOperation}
          lineWidth={lineWidth}
          drawLines={drawLines}
          sendStrokes={sendStrokes}
          id={id}
        />
        <Pallete
          setChalkboardColor={setChalkboardColor}
          setStrokeStyle={setStrokeStyle}
          setGlobalCompositeOperation={setGlobalCompositeOperation}
          setLineWidth={setLineWidth}
          resetStrokes={resetStrokes}
          undoStrokes={undoStrokes}
          redoStrokes={redoStrokes}
          id={id}
        />
      </div>
    </>
  );
}

export default App;