require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctor_route');
const adminRoutes = require('./routes/admin_route');
const patientRoutes = require('./routes/patient_route');
const cors = require('cors');
const path = require("path");
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};

io.on("connection", socket => {
  socket.on("join room", roomID => {
    if (users[roomID]) {
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    const otherUsers = users[roomID].filter(id => id !== socket.id);
    socket.emit("all users", otherUsers);

    socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit("user joined", { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
      io.to(payload.callerID).emit("receiving returned signal", { signal: payload.signal, id: socket.id });
    });

    socket.on("disconnect", () => {
      users[roomID] = users[roomID].filter(id => id !== socket.id);
      io.emit("user left", socket.id);
    });
  });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
  res.send("Welcome to the backend of the user authentication system");
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  if (error && error.code === 'ECONNREFUSED') {
    console.error('Disconnected from database');
  } else {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
});

db.once('open', () => {
  console.log('Connected to database');
});

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
// Routes
app.use('/api/auth', doctorRoutes);
app.use('/api/auth', patientRoutes);
app.use('/api/auth', adminRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
