require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {

});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Prescription Routes
const prescriptionRoutes = require('./routes/prescription');
app.use('/api', prescriptionRoutes);

// Socket.io setup
io.on("connection", (socket) => {
  // console.log("Socket connected");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    // console.log("Socket disconnected");
  });
});

// Error handler middleware
function error(err, req, res, next) {
  if (!test) console.error(err.stack);
  res.status(500);
  res.send("Internal Server Error");
}
app.use(error);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
