import "../../CSS/Channel.css";
import { BiMessageAltDetail } from "react-icons/bi";
import React, {useState} from "react";

const Channel = () => {
  const [view, setView] = useState(true);
  
  const toggleChannelView = (e) => {
    setView(!view);
  }

  return (
    <>
      <div className={`channel ${view ? "" : "hidden"}`}>
        <div id="submit-wrapper">
          <BiMessageAltDetail id="toggle-chat" onClick={(e) => {toggleChannelView(e)}}/>
          <div id="input"><input type="text" placeholder="Enter message"/></div>
          <div id="submit">Submit</div>
        </div>
        <div id="messages">
          
        </div>
      </div>
    </>
  );
};

export default Channel;