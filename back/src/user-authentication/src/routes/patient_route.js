const express = require('express');
const router = express.Router();
const authController= require('../controllers/patient_auth');
const { verifyToken } = require('../controllers/patient_auth');
const upload = require('../middlewares/upload')

router.post('/patient/signup', authController.signup);
router.post('/patient/signin', authController.signin);
router.get('/doctors/verified', verifyToken, authController.getVerifiedDoctors);
router.post('/appointment/request', verifyToken, authController.bookAppointment);
router.put('/patient/details', verifyToken, upload.single('profilePicture'), authController.completeDetails);
router.put('/updatePatient', verifyToken, upload.single('profilePicture'), authController.updateUserData);
router.get('/patient/currentUser',verifyToken,  authController.getCurrentUser);

// Route to approve an appointment request

module.exports = router;
