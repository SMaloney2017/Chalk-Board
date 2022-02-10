import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newMessageEvent";
const NEW_LINE_EVENT = "newLineEvent";
const NEW_RESET_EVENT = "resetLinesEvent";
const NEW_UNDO_EVENT = "undoLineEvent";
const NEW_REDO_EVENT = "redoLineEvent";
const SOCKET_SERVER_URL = "/"; //http://localhost:4000

const useSockets = (id) => {
  const [drawLines, setLines] = useState([]);
  const [redoLines, setRedoLines] = useState([]);
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { id },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (newMessage) => {
      const incomingMessage = {
        ...newMessage,
        ownedByCurrentUser: newMessage.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(NEW_LINE_EVENT, (newStroke) => {
      const incomingStroke = {
        ...newStroke,
        ownedByCurrentUser: newStroke.senderId === socketRef.current.id,
      };
      setLines((drawLines) => [...drawLines, incomingStroke]);
    });

    socketRef.current.on(NEW_RESET_EVENT, () => {
      setLines([]);
    });

    socketRef.current.on(NEW_UNDO_EVENT, () => {
      if (drawLines.length > 0) {
        const tempArray = [...redoLines];
        tempArray.push(drawLines.pop());
        setRedoLines(tempArray);
        setLines(drawLines);
      }
    });

    socketRef.current.on(NEW_REDO_EVENT, () => {
      if (redoLines.length > 0) {
        const tempArray = [...drawLines];
        tempArray.push(redoLines.pop());
        setRedoLines(redoLines);
        setLines(tempArray);
      } 
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id, drawLines, redoLines]);

  const sendMessage = (newMessage) => {
    var date = new Date();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: newMessage,
      timestamp: `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
      senderId: socketRef.current.id,
    });
  };

  const sendStrokes = (newStrokes) => {
    socketRef.current.emit(NEW_LINE_EVENT, {
      body: newStrokes,
      senderId: socketRef.current.id,
    });
  };

  const resetStrokes = () => {
    socketRef.current.emit(NEW_RESET_EVENT);
  };

  const undoStrokes = () => {
    socketRef.current.emit(NEW_UNDO_EVENT);
  };

  const redoStrokes = () => {
    socketRef.current.emit(NEW_REDO_EVENT);
  };

  return { 
    drawLines,
    messages,
    sendStrokes,
    resetStrokes,
    undoStrokes,
    redoStrokes,
    sendMessage,
  };
};

export default useSockets;
