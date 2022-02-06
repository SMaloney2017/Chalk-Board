import "./CSS/App.css";
import React, { useState, useEffect } from "react";
import Canvas from "./Components/Canvas/Canvas.js"
import Pallete from "./Components/Pallete/Pallete.js"
import Channel from "./Components/Channel/Channel.js"

function App() {
  const [chalkboardColor, setChalkboardColor] = useState("#354d42");
  const [context, setContext] = useState(false);
  const [id, setId] = useState("");
  
  const getExtension = (url) => {
    setId(url.pathname.slice(1)); /* Remove preceding '/' of pathname */
  }

  useEffect(() => {
    getExtension(window.location)
  }, []);

  return (
    <>
      <div id="lobby">
        <Channel id={id}/>
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