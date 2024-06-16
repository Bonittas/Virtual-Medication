const multer = require('multer');
const path = require('path');

// Storage configuration for profile pictures
const profilePictureStorage = multer.diskStorage({
  destination: './images/profilePictures',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    if (validExtensions.includes(ext.toLowerCase())) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profilePicture-' + uniqueSuffix + ext);
    } else {
      cb(new Error('Only JPG, JPEG, PNG and GIF files are allowed'));
    }
  }
});

// Storage configuration for CV files
const cvStorage = multer.diskStorage({
  destination: './cvs',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext.toLowerCase() === '.pdf') {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'cv-' + uniqueSuffix + ext);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Multer upload instances
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'profilePicture') {
        cb(null, './images/profilePictures');
      } else if (file.fieldname === 'cvFile') {
        cb(null, './cvs');
      }
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB for images
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'profilePicture') {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const ext = path.extname(file.originalname);
      if (validExtensions.includes(ext.toLowerCase())) {
        cb(null, true);
      } else {
        cb(new Error('Only JPG, JPEG, PNG and GIF files are allowed'));
      }
    } else if (file.fieldname === 'cvFile') {
      const ext = path.extname(file.originalname);
      if (ext.toLowerCase() === '.pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed'));
      }
    }
  }
}).fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'cvFile', maxCount: 1 }]);

module.exports = {
  upload
};
