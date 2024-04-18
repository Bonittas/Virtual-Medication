require('dotenv').config();

const express = require("express");
const connectDB = require("./config/db");
const postRoutes = require("./routes/post");
const cors = require('cors');
const viewDoctors = require("./routes/getDoctors")
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5001;
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use('/api/admin', viewDoctors)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
