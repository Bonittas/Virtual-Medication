const express = require('express');
const router = express.Router();
const authController= require('../controllers/doctor_auth');
const { verifyToken } = require('../controllers/doctor_auth');


router.post('/doctor/signup', authController.signup);
router.post('/doctor/signin', authController.signin);
router.post('/doctor/complete-profile/:userId', authController.verifyToken, authController.completeProfile)
router.get('/currentUser',  authController.getCurrentUser);
module.exports = router;
