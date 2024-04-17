require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctor_route');
const adminRoutes = require('./routes/admin_route');
const cors = require('cors');
const patientRoutes = require('./routes/patient_route');

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the user authentication system");
});

// Database connection
mongoose.connect(process.env.MONGODB_URI);

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
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
