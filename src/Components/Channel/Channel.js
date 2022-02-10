import "../../CSS/Channel.css";
import { BiMessageAltDetail, BiLogIn } from "react-icons/bi";
import React, { useState } from "react";
import useSockets from "../Hooks/useSockets.js";

const Channel = ({ setId,  messages, sendMessage }) => {
  const [view, setView] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState("");

  const toggleChannelView = (e) => {
    setView(!view);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  
  const handleRoomIdChange = (e) => {
    document.getElementById("roomid").style.color = "crimson";
    setRoomId(e.target.value);
  };

  const handleRoomJoin = (e) => {
    e.preventDefault();
    document.getElementById("roomid").style.color = "#00ff6a";
    document.getElementById("roomid").style.pointerEvents = "none";
    document.getElementById("join").style.pointerEvents = "none";
    setId(roomId);
  };

  return (
    <>
      <div className={`channel ${view ? "" : "hidden"}`}>
        <div id="submit-wrapper">
          <BiMessageAltDetail
            id="toggle-chat"
            onClick={(e) => {
              toggleChannelView(e);
            }}
          />
          <div id="input">
            <input
              type="text"
              placeholder="Enter message"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
          </div>
          <div id="submit" onClick={handleSendMessage}>
            Submit
          </div>
        </div>
        <div id="messages-wrapper">
          <ol
            className="messages-list"
            style={{ listStyle: "none", color: "teal" }}
          >
            <li>
              <span style={{ color: "crimson" }}>[ADMIN]</span> Create or join
              an instance by entering a RoomID!
            </li>
            <li>
              <span style={{ color: "crimson", float: "left" }}>[ADMIN]</span>
              <div id="join-wrapper">
                <input
                  id="roomid"
                  type="text"
                  placeholder="RoomID"
                  pattern={"a-zA-Z0-9"}
                  maxLength="4"
                  value={roomId}
                  onChange={handleRoomIdChange}
                />
                <div id="join" onClick={handleRoomJoin}>
                  <BiLogIn />
                </div>
              </div>
            </li>
            {messages.map((message, i) => (
              <li
                key={i}
                className={
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }
              >
                {message.timestamp}
                {`\t`}
                {message.body}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Channel;
