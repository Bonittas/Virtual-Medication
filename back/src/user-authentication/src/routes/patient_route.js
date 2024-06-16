const express = require('express');
const router = express.Router();
const authController= require('../controllers/patient_auth');
const { verifyToken } = require('../controllers/patient_auth');
const upload = require('../middlewares/upload')

router.post('/patient/signup', authController.signup);
router.post('/patient/signin', authController.signin);
router.get('/doctors/verified' , verifyToken, authController.getVerifiedDoctors);
router.post('/appointment/request', verifyToken, authController.requestAppointment);
router.put('/patient/details', verifyToken, upload, authController.completeDetails);
router.put('/updatePatient', verifyToken, upload, authController.updateUserData);
router.get('/patient/currentUser',verifyToken,  authController.getCurrentUser);
// router.get('/appointment-requests/:_id/status', authController.getStatus);
router.get('/patient/appointments',verifyToken, authController.getPatientAppointments);

router.post('/doctor/signout', authController.logout);   


// Route to approve an appointment request

module.exports = router;
