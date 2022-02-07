import "../../CSS/Pallete.css"
import React from "react";
import { BiBrush, BiChalkboard, BiEraser } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { MdUndo, MdRedo } from "react-icons/md";

const Pallete = ({setChalkboardColor, setStrokeStyle, setGlobalCompositeOperation, setLineWidth}) => {

  const toggleBrush = (e) => {
    document.getElementById("brush").style["color"] = e;
    document.getElementById("eraser").style["color"] = "pink";
    setGlobalCompositeOperation("source-over");
  }
  
  const toggleEraser = (e) => {
    document.getElementById("eraser").style["color"] = "deeppink";
    setGlobalCompositeOperation("destination-out");
  }
  
  const toggleStrokeStyle = (e) => {
    toggleBrush(e);
    setStrokeStyle(e);
  }

  const toggleLineWidth = (e) => {
    setLineWidth(e);
  }

  const resetCanvas = (e) => {
    /* Implement Reset Canvas */
  }

  return (
    <>
      <div id="pallete">
        <div className="swatch">
          <MdUndo style={{fontSize: "25px", color: "white", cursor: "pointer"}}/>
          <MdRedo style={{fontSize: "25px", color: "white", cursor: "pointer"}}/>
          <BiEraser id="eraser" style={{fontSize: "25px", color: "pink", cursor: "pointer"}} onClick={(e) => {toggleEraser()}}/>
          <BiBrush id="brush" style={{fontSize: "25px", color: "black", cursor: "pointer"}} onClick={(e) => {toggleBrush()}}/>
        </div>
        <div className="swatch">
          <div className="color" style={{backgroundColor: "black"}} onClick={(e) => {toggleStrokeStyle("black")}}/>
          <div className="color" style={{backgroundColor: "grey"}} onClick={(e) => {toggleStrokeStyle("grey")}}/>
          <div className="color" style={{backgroundColor: "white"}} onClick={(e) => {toggleStrokeStyle("white")}}/>
          <div className="color" style={{backgroundColor: "red"}} onClick={(e) => {toggleStrokeStyle("red")}}/>
          <div className="color" style={{backgroundColor: "yellow"}} onClick={(e) => {toggleStrokeStyle("yellow")}}/>
          <div className="color" style={{backgroundColor: "green"}} onClick={(e) => {toggleStrokeStyle("green")}}/>
          <div className="color" style={{backgroundColor: "cyan"}} onClick={(e) => {toggleStrokeStyle("cyan")}}/>
          <div className="color" style={{backgroundColor: "blue"}} onClick={(e) => {toggleStrokeStyle("blue")}}/>
          <div className="color" style={{backgroundColor: "purple"}} onClick={(e) => {toggleStrokeStyle("purple")}}/>
          <label className="custom"><input type="color" onChange={(e) => {toggleStrokeStyle(e.target.value)}}/></label>
        </div>
        <div id="brush-weight">
          <input type="range" min={1} max={20} defaultValue={3} orient="vertical" onChange={(e) => {toggleLineWidth(e.target.value)}}/>
        </div>
        <div className="swatch">
          <BiChalkboard style={{fontSize: "25px", color:"white"}}/>
          <div className="color" style={{backgroundColor: "#354d42"}} onClick={(e) => {setChalkboardColor("#354d42")}}/>
          <div className="color" style={{backgroundColor: "#181818"}} onClick={(e) => {setChalkboardColor("#181818")}}/>
          <div className="color" style={{backgroundColor: "#194050"}} onClick={(e) => {setChalkboardColor("#194050")}}/>
          <label className="custom"><input type="color" onChange={(e) => {setChalkboardColor(e.target.value)}}/></label>
        </div>
        <div id="reset-button">
          <FaTrashAlt onClick={(e) => {resetCanvas(e)}}/>
        </div>
      </div>
    </>
  );
};

export default Pallete;