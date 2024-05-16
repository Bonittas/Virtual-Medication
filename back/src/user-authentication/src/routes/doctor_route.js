const express = require('express');
const router = express.Router();
const authController= require('../controllers/doctors/doctor_auth');
const { verifyToken } = require('../controllers/doctors/doctor_auth');
const upload = require('../middlewares/upload')
const  doctorProfile = require('../controllers/doctors/doctorProfile')
const getDoctor = require('../controllers/doctors/doctorProfile')
const getDoctorProfile = require('../controllers/doctors/doctorProfile')

router.post('/doctor/signup', authController.signup);
router.post('/doctor/signin', authController.signin);
router.post('/doctor/signout', authController.logout);

router.put('/doctor/details', verifyToken, upload.single('profilePicture'), authController.completeDetails);
router.get('/currentUser', verifyToken, authController.getCurrentUser);
router.put('/doctor/profile', verifyToken, upload.single('profilePicture'), authController.updateProfile);
router.put('/updateDoctor', verifyToken, upload.single('profilePicture'), authController.updateUserData);
router.get('/notifications', verifyToken, authController.getNotifications);
router.get('/doctor/appointments/:id', verifyToken, authController.getAppointments);

// router.post('/doctor/uploadFile', verifyToken, upload.single('file'), authController.uploadFile);
// router.post('/doctor/uploadImage', verifyToken, upload.single('profilePicture'), authController.uploadImage);

// router.get('/user/profile', verifyToken,  getDoctor.getUserData);
// router.get('/doctor/profile/:doctorId', verifyToken, getDoctor.getDoctorProfile);

module.exports = router;
