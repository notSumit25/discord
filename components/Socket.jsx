import { Socket, io } from "socket.io-client"

PORT=process.env.PORT
export default function socketClient() {
  const socket = io(`:${PORT + 1}`, { path: "/api/socket", addTrailingSlash: false })

  socket.on("connect", () => {
    console.log("Connected")
  })

  socket.on("disconnect", () => {
    console.log("Disconnected")
  })

  socket.on("connect_error", async err => {
    console.log(`connect_error due to ${err.message}`)
    await fetch("/api/socket")
  })

  return socket
}