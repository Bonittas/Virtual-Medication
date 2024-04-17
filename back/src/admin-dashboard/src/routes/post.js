// routes/postRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.get("/", getAllPosts);
router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
