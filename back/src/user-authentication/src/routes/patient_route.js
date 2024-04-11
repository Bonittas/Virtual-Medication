const express = require('express');
const router = express.Router();
const authController= require('../controllers/patient_auth');
const { verifyToken } = require('../controllers/patient_auth');


router.post('/patient/signup', authController.signup);
router.post('/patient/signin', authController.signin);

router.get('/currentUser',  authController.getCurrentUser);
module.exports = router;
