import "../../CSS/Pallete.css"
import React from "react";
import { BiBrush, BiChalkboard } from "react-icons/bi";

const Pallete = ({ lineWidth, setLineColor, setLineWidth, setChalkboardColor }) => {
  return (
    <>
      <div className="pallete">
        <div className="swatch">
          <BiBrush style={{fontSize: "25px", color:"white"}}/>
          <div className="color" style={{backgroundColor: "black"}} onClick={(e) => {setLineColor("black")}}/>
          <div className="color" style={{backgroundColor: "grey"}} onClick={(e) => {setLineColor("grey")}}/>
          <div className="color" style={{backgroundColor: "white"}} onClick={(e) => {setLineColor("white")}}/>
          <div className="color" style={{backgroundColor: "red"}} onClick={(e) => {setLineColor("red")}}/>
          <div className="color" style={{backgroundColor: "yellow"}} onClick={(e) => {setLineColor("yellow")}}/>
          <div className="color" style={{backgroundColor: "green"}} onClick={(e) => {setLineColor("green")}}/>
          <div className="color" style={{backgroundColor: "cyan"}} onClick={(e) => {setLineColor("cyan")}}/>
          <div className="color" style={{backgroundColor: "blue"}} onClick={(e) => {setLineColor("blue")}}/>
          <div className="color" style={{backgroundColor: "purple"}} onClick={(e) => {setLineColor("purple")}}/>
          <input type="color" onChange={(e) => {setLineColor(e.target.value)}}/>
        </div>
        <div className="brush">
          <input type="range" min={1} max={20} defaultValue={3} onChange={(e) => {setLineWidth(e.target.value)}}/>
        </div>
        <div className="blackboard">
          <BiChalkboard style={{fontSize: "25px", color:"white"}}/>
          <div className="color" style={{backgroundColor: "#354d42"}} onClick={(e) => {setChalkboardColor("#354d42")}}/>
          <div className="color" style={{backgroundColor: "#181818"}} onClick={(e) => {setChalkboardColor("#181818")}}/>
          <div className="color" style={{backgroundColor: "#432323"}} onClick={(e) => {setChalkboardColor("#432323")}}/>
          <input type="color" onChange={(e) => {setChalkboardColor(e.target.value)}}/>
        </div>
      </div>
    </>
  );
};

export default Pallete;