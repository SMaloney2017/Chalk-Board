import { useEffect, useRef, useState } from "react";

function Canvas(props) { 
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = props.lineColor;
      ctx.lineWidth = props.lineWidth;
  
      ctxRef.current = ctx;
    }, [props.lineColor, props.lineWidth]);
  
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
      <canvas
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        onMouseMove={paintCanvas}
        width={`1000px`}
        height={`750px`}
        ref={canvasRef}
      />
    </>
  )
}

export default Canvas