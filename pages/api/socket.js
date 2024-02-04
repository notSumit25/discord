// pages/api/socket.js
import { Server } from "socket.io";

const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};
 
PORT=process.env.PORT

function SocketHandler(_req, res) {
  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: "Socket is already running", socket: `:${PORT + 1}` });
    return;
  }

  console.log("Starting Socket.IO server on port:", PORT + 1);

  // Setting up Socket.IO server with specific configurations
  const io = new Server({
    addTrailingSlash: false, // Ensure trailing slashes are not added to the path
    cors: { origin: "*" },   // Enable CORS for all origins
  }).listen(PORT + 1);

  io.on("connect", (socket) => {
    const _socket = socket;
    console.log("socket connect", socket.id);
    _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);
    socket.on("disconnect", async () => {
      console.log("socket disconnect");
    });
  });

  res.socket.server.io = io;
  res.status(201).json({ success: true, message: "Socket is started", socket: `:${PORT + 1}` });
}

module.exports = { config, SocketHandler };
