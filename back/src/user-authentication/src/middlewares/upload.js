const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif']; 
    if (validExtensions.includes(ext.toLowerCase())) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profilePicture-' + uniqueSuffix + ext);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'));
    }
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  }
});

module.exports = upload;
