require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000" },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Prescription Routes
const prescriptionRoutes = require('./routes/prescription');
app.use('/api', prescriptionRoutes);

// Socket.io setup
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
