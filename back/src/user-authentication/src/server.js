const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctor_route')
const adminRoutes = require('./routes/admin_route')
const cors = require('cors')
const patientRoutes = require('./routes/patient_route')
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database connection error:', error.message);
  process.exit(1); // Exit the application if unable to connect to the database
});

// Once the connection is open, log a success message
db.once('open', () => {
  console.log('Connected to database');
});

// Log a message when the MongoDB connection is disconnected
db.on('disconnected', () => {
  console.log('Disconnected from database');
});

// Middleware
app.use(express.json());
app.use(cors(
  {
    origin:["https://depoy-mern-lwhq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
))
// Routes
app.use('/api/auth', doctorRoutes);
app.use('/api/auth', patientRoutes);
app.use('/api/auth', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Close the MongoDB connection when the Node.js process is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
