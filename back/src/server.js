const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("../src/admin-dashboard/src/routes/post");
const adminRoutes = require("../src/user-authentication/src/routes/admin_route");
const doctorRoutes = require("../src/user-authentication/src/routes/doctor_route");
const patientRoutes = require("../src/user-authentication/src/routes/patient_route");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", postRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/auth", doctorRoutes);
app.use("/api/auth", patientRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API gateway");
});

const mongooseOptions = {

  connectTimeoutMS: 30000, // Increase the connection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase the socket timeout to 45 seconds
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Graceful shutdown
