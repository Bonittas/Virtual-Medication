const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);
const cors = require('cors');
app.use(cors());



const PORT = process.env.PORT || 5000;

const users = {};
const corsOrigin ={
  origin:'http://localhost:3000', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));
const socketToRoom = {};

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  res.send("Server is running");

   });
//SOCKET CONFIGURATION

io.on("connection", (socket) => {
  // JOIN ROOM EVENT
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 10) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  // DISCONNECT EVENT
  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
