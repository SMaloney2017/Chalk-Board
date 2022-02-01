import "../../CSS/Canvas.css";
import { useEffect, useRef, useState } from "react";

function Canvas({chalkboardColor, isErasing, setContext}) { 
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;
    ctxRef.current = ctx;
  }, [setContext, isErasing]);

  const startPainting = (event) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    setIsPainting(true);
  };
  
  const stopPainting = () => {
    ctxRef.current.closePath();
    setIsPainting(false);
  };
  
  const paintCanvas = (event) => {
    if (!isPainting) {
      return;
    }
    ctxRef.current.lineTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    ctxRef.current.stroke();
  };

  return(
    <>
      <div className="chalkboard" style={{backgroundColor: chalkboardColor}}>
        <div className="text">
          <div className="url"/>
        </div>
        <canvas
          onMouseDown={startPainting}
          onMouseUp={stopPainting}
          onMouseMove={paintCanvas}
          width={`1500px`}
          height={`750px`}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Canvas