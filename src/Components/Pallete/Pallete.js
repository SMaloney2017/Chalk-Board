import "../../CSS/Pallete.css"
import React from "react";
import { BiBrush, BiChalkboard, BiEraser } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

const Pallete = ({setChalkboardColor, context}) => {

  const toggleBrush = (e) => {
    document.getElementById("brush").style["color"] = e;
    document.getElementById("eraser").style["color"] = "pink";
    context.globalCompositeOperation = "source-over";
  }
  
  const toggleEraser = (e) => {
    document.getElementById("eraser").style["color"] = "deeppink";
    context.globalCompositeOperation = "destination-out";
  }
  
  const toggleColor = (e) => {
    toggleBrush(e);
    context.strokeStyle = e;
  }

  return (
    <>
      <div className="pallete">
        <div className="swatch">
          <BiEraser id="eraser" style={{fontSize: "25px", color:"pink"}} onClick={(e) => {toggleEraser()}}/>
          <BiBrush id="brush" style={{fontSize: "25px", color:"white"}} onClick={(e) => {toggleBrush()}}/>
          <div className="color" style={{backgroundColor: "black"}} onClick={(e) => {toggleColor("black")}}/>
          <div className="color" style={{backgroundColor: "grey"}} onClick={(e) => {toggleColor("grey")}}/>
          <div className="color" style={{backgroundColor: "white"}} onClick={(e) => {toggleColor("white")}}/>
          <div className="color" style={{backgroundColor: "red"}} onClick={(e) => {toggleColor("red")}}/>
          <div className="color" style={{backgroundColor: "yellow"}} onClick={(e) => {toggleColor("yellow")}}/>
          <div className="color" style={{backgroundColor: "green"}} onClick={(e) => {toggleColor("green")}}/>
          <div className="color" style={{backgroundColor: "cyan"}} onClick={(e) => {toggleColor("cyan")}}/>
          <div className="color" style={{backgroundColor: "blue"}} onClick={(e) => {toggleColor("blue")}}/>
          <div className="color" style={{backgroundColor: "purple"}} onClick={(e) => {toggleColor("purple")}}/>
          <input type="color" onChange={(e) => {toggleColor(e.target.value)}}/>
        </div>
        <div className="brush">
          <input type="range" min={1} max={20} defaultValue={1} onChange={(e) => {context.lineWidth = e.target.value}}/>
        </div>
        <div className="blackboard">
          <BiChalkboard style={{fontSize: "25px", color:"white"}}/>
          <div className="color" style={{backgroundColor: "#354d42"}} onClick={(e) => {setChalkboardColor("#354d42")}}/>
          <div className="color" style={{backgroundColor: "#181818"}} onClick={(e) => {setChalkboardColor("#181818")}}/>
          <div className="color" style={{backgroundColor: "#194050"}} onClick={(e) => {setChalkboardColor("#194050")}}/>
          <input type="color" onChange={(e) => {setChalkboardColor(e.target.value)}}/>
        </div>
        <div className="reset-button ">
          <FaTrashAlt onClick={(e) => {context.clearRect(0, 0, 1500, 750)}}/>
        </div>
      </div>
    </>
  );
};

export default Pallete;