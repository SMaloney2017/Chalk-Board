const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newMessageEvent";
const NEW_LINE_EVENT = "newLineEvent";
const NEW_RESET_EVENT = "resetLinesEvent";
const NEW_UNDO_EVENT = "undoLineEvent";
const NEW_REDO_EVENT = "redoLineEvent";

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
};

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(id).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on(NEW_LINE_EVENT, (data) => {
    io.in(id).emit(NEW_LINE_EVENT, data);
  });

  socket.on(NEW_RESET_EVENT, () => {
    io.in(id).emit(NEW_RESET_EVENT);
  });

  socket.on(NEW_UNDO_EVENT, () => {
    io.in(id).emit(NEW_UNDO_EVENT);
  });

  socket.on(NEW_REDO_EVENT, () => {
    io.in(id).emit(NEW_REDO_EVENT);
  });

  socket.on("disconnect", () => {
    socket.leave(id);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});