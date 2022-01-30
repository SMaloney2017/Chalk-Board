import "../../CSS/Pallete.css"
import React from "react";
import { BiBrush, BiChalkboard } from "react-icons/bi";
  
const Pallete = ({ setLineColor, setLineWidth }) => {
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
          <input type="color" onChange={(e) => {setLineColor(e.target.value); }}/>
        </div>
      </div>
    </>
  );
};

export default Pallete;