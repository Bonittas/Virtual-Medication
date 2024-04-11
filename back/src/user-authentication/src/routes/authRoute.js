const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');
const { verifyToken } = require('../controllers/authController');


router.post('/patient/signup', authController.signup);
router.post('/patient/signin', authController.signin);

// Route to get current user information
router.get('/currentUser',  authController.getCurrentUser);
module.exports = router;
