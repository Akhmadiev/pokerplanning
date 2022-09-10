const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_CLIENT || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

console.log(process.env.REACT_APP_CLIENT);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.roomId);
  });

  socket.on("refetch", (roomId) => {
    socket.broadcast.to(roomId).emit("refetch");
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
