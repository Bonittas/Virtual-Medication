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
router.put('/appointment-requests/:id/approve', authController.approveAppointment);
router.get('/appointment-requests',verifyToken, authController.getAppointmentRequests);

router.put('/appointment-requests/:id/reject', authController.rejectAppointment);
router.put('/doctor/details', verifyToken, upload, authController.completeDetails);
router.get('/currentUser', verifyToken, authController.getCurrentUser);
router.put('/doctor/profile', verifyToken, upload, authController.updateProfile);
router.put('/updateDoctor', verifyToken, upload, authController.updateUserData);
router.get('/notifications', verifyToken, authController.getNotifications);
// router.get('/doctor/appointments/:id', verifyToken, authController.getAppointments);
router.get('/approved-appointments',verifyToken, authController.getApprovedAppointments);
router.get('/rejected-appointments',verifyToken, authController.getRejectedAppointments);

router.get('/get',verifyToken, authController.getPastAppointments);
router.get('/add',verifyToken, authController.addPastAppointment);
// routes/prescriptionRoutes.js



// Routes
router.post('/prescriptions',verifyToken, authController.createPrescription);
router.get('/prescriptions',verifyToken,  authController.getAllPrescriptions);
router.get('/prescriptions/:id', authController.getPrescriptionById);
router.put('/prescriptions/:id', authController.updatePrescription);
router.delete('/prescriptions/:id', authController.deletePrescription);

module.exports = router;

// router.post('/doctor/uploadFile', verifyToken, upload.single('file'), authController.uploadFile);
// router.post('/doctor/uploadImage', verifyToken, upload, authController.uploadImage);

// router.get('/user/profile', verifyToken,  getDoctor.getUserData);
// router.get('/doctor/profile/:doctorId', verifyToken, getDoctor.getDoctorProfile);

module.exports = router;
