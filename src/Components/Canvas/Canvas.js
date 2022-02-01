import "../../CSS/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function Canvas({chalkboardColor, lineColor, lineWidth, isErasing}) { 
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over"
    ctxRef.current = ctx;
  }, [lineColor, lineWidth, isErasing]);

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

  const resetCanvas =() => {
    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return(
    <>
      <div className="chalkboard" style={{backgroundColor: chalkboardColor}}>
        <div className="text">
          <div className="url"/>
        </div>
        <div className="reset-button ">
          <FaTrashAlt onClick={(e) => {resetCanvas()}}/>
        </div>
        <canvas
          id="canvas"
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