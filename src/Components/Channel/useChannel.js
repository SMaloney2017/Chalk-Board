import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newMessageEvent";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChannel = (id) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { id },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const sendMessage = (messageBody) => {
    var date = new Date();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      timestamp: `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChannel;
