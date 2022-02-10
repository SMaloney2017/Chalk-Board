import "../../CSS/Channel.css";
import { BiMessageAltDetail } from "react-icons/bi";
import React, { useState } from "react";
import useChannel from "./useChannel.js";

const Channel = ({ setId }) => {
  const [view, setView] = useState(true);
  const [RoomID, setRoomId] = useState("");
  const { messages, sendMessage } = useChannel(RoomID);
  const [newMessage, setNewMessage] = useState("");

  const toggleChannelView = (e) => {
    setView(!view);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  
  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleRoomJoin = (e) => {
    setId(RoomID);
  };

  const handleSendMessage = (e) => {
    sendMessage(newMessage);
    setNewMessage("");
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
          <div className="input">
            <input
              type="text"
              placeholder="Enter message"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
          </div>
          <div className="submit" onClick={handleSendMessage}>
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
              an instance by entering an ID!
            </li>
            <li>
              <span style={{ color: "crimson" }}>[ADMIN]</span>
              <input
                className="input roomid"
                type="text"
                placeholder="Enter RoomId"
                value={RoomID}
                onChange={handleRoomIdChange}
              />
              <div className="submit join" onClick={handleRoomJoin}>
                +
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
