require('dotenv/config')

const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const postRoutes = require("./routes/post");
const viewPatients = require("./routes/getPatients")
const viewDoctors = require("./routes/getDoctors")
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5001;
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the admin dashboard system");
});
connectDB();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use('/api/admin', viewDoctors)
app.use('/api/admin', viewPatients)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
