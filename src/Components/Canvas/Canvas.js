import "../../CSS/Canvas.css";
import { useEffect, useRef, useState } from "react";
import useCanvas from "./useCanvas.js";

function Canvas({
  chalkboardColor,
  lineWidth,
  globalCompositeOperation,
  strokeStyle,
  id,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const { drawLines, sendStrokes } = useCanvas(id);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const lineArray = [];
    const newStroke = {};
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = globalCompositeOperation;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;

    ctxRef.current = ctx;

    newStroke.weight = lineWidth;
    newStroke.color = strokeStyle;
    newStroke.globalCompositeOperation = globalCompositeOperation;

    const redrawCanvas = () => {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      drawLines.map((lineArray) => {
        if (lineArray.hasOwnProperty("body")) {
          lineArray.body.forEach((stroke) => drawStroke(stroke));
        }
        return true;
      });
    };

    const drawStroke = (newStroke, emit) => {
      ctxRef.current.globalCompositeOperation =
        newStroke.globalCompositeOperation;
      ctxRef.current.lineWidth = newStroke.weight;
      ctxRef.current.strokeStyle = newStroke.color;
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(newStroke.x, newStroke.y);
      ctxRef.current.lineTo(newStroke.x1, newStroke.y1);
      ctxRef.current.stroke();
      ctxRef.current.closePath();

      if (!emit) {
        return;
      }
      lineArray.push(JSON.parse(JSON.stringify(newStroke)));
    };

    const startPainting = (event) => {
      setIsPainting(true);
      newStroke.x = event.offsetX;
      newStroke.y = event.offsetY;
    };

    const stopPainting = (event) => {
      setIsPainting(false);
      sendStrokes(lineArray);
    };

    const paintCanvas = (event) => {
      if (!isPainting) {
        return;
      }
      newStroke.x1 = event.offsetX;
      newStroke.y1 = event.offsetY;
      drawStroke(newStroke, true);
      newStroke.x = event.offsetX;
      newStroke.y = event.offsetY;
    };

    canvas.onmousedown = startPainting;
    canvas.onmouseup = stopPainting;
    canvas.onmousemove = paintCanvas;

    redrawCanvas();
  }, [
    strokeStyle,
    lineWidth,
    globalCompositeOperation,
    isPainting,
    drawLines,
    sendStrokes,
  ]);

  return (
    <>
      <div id="chalkboard" style={{ backgroundColor: chalkboardColor }}>
        <canvas width={`1500px`} height={`750px`} ref={canvasRef} />
      </div>
    </>
  );
}

export default Canvas;
