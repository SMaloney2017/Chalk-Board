import "./CSS/App.css";
import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"

function App() {
  const [chalkboardColor, setChalkboardColor] = useState("#354d42");
  const [context, setContext] = useState(false);

  return (
    <>
      <div className="lobby">
        <Canvas
          chalkboardColor={chalkboardColor}
          setContext={setContext}
        />
        <Pallete
          setChalkboardColor={setChalkboardColor}
          context={context}
        />
      </div>
    </>
  );
}

export default App;