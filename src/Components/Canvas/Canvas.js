import "../../CSS/Canvas.css";
import { useEffect, useRef, useState } from "react";
import useCanvas from "./useCanvas.js"

function Canvas({chalkboardColor, setContext, id}) { 
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  const { strokes, sendStroke } = useCanvas(id);

  useEffect(() => {
    const newStroke = {};
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;
    ctxRef.current = ctx;
    newStroke.weight = ctx.lineWidth;
    newStroke.color = ctx.strokeStyle;

    const startPainting = (event) => {
      setIsPainting(true);
      newStroke.x = event.offsetX || event.touches[0].offsetX;
      newStroke.y = event.offsetY || event.touches[0].offsetY;
    };
    
    const stopPainting = (event) => {
      setIsPainting(false);
    };
    
    const paintCanvas = (event) => {
      if (!isPainting) {
        return;
      }
      newStroke.x1 = event.offsetX || event.touches[0].offsetX;
      newStroke.y1 = event.offsetY || event.touches[0].offsetY;
      drawStroke(newStroke, true);
      newStroke.x = event.offsetX || event.touches[0].offsetX;
      newStroke.y = event.offsetY || event.touches[0].offsetY;
    };
    
    const drawStroke = (newStroke, emit) => {
      ctx.lineWidth = newStroke.weight;
      ctx.strokeStyle = newStroke.color;
      ctx.beginPath();
      ctx.moveTo(
        newStroke.x,
        newStroke.y
      );
      ctx.lineTo(
        newStroke.x1,
        newStroke.y1
      );
      ctx.stroke();
      ctx.closePath();
  
      if(!emit) { return; }
      sendStroke(newStroke);
    };

    canvas.onmousedown = startPainting;
    canvas.onmouseup = stopPainting;
    canvas.onmouseout = stopPainting;
    canvas.onmousemove = paintCanvas;

  }, [setContext, isPainting, strokes, sendStroke]);

  return(
    <>
      <div id="chalkboard" style={{backgroundColor: chalkboardColor}}>
        <canvas
          width={`1500px`}
          height={`750px`}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Canvas