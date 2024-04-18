// backend/controllers/postController.js

const Post = require("../models/Post");
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().select('-__v').populate('image', 'url');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  // Check if req.file is defined before accessing its properties
  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    return res.status(400).json({ message: "Image is required" });
  }

  const post = new Post({ title, body, image });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Multer middleware to handle file upload
exports.uploadSingle = upload.single('image');
