const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChannelMessage";

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(id).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});