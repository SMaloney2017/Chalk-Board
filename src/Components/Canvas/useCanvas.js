import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_DRAW_EVENT = "newCanvasStroke";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useCanvas = (id) => {
  const [drawStrokes, setStroke] = useState([]);
  const socketRef = useRef();
  
  useEffect(() => {
    
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { id },
    });
    
    socketRef.current.on(NEW_DRAW_EVENT, (stroke) => {
      const incomingStroke = {
        ...stroke,
        ownedByCurrentUser: stroke.senderId === socketRef.current.id,
      };
      setStroke((drawStrokes) => [...drawStrokes, incomingStroke]);
    });
    return () => {
      socketRef.current.disconnect();
    };

  }, [id]);

  const sendStroke = (stroke) => {
    socketRef.current.emit(NEW_DRAW_EVENT, {
      body: stroke,
      senderId: socketRef.current.id,
    });
  };

  return { drawStrokes, sendStroke };
};

export default useCanvas;