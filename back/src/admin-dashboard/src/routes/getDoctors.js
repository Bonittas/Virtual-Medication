const express = require('express');
const router = express.Router();
const viewDoctorController = require('../controllers/viewDoctors');

// Route to view all doctors
router.get('/doctors', viewDoctorController.viewDoctors);

// Route to verify a doctor
router.put('/doctors/verify/:doctorId', viewDoctorController.verifyDoctor);

// Route to unverify a doctor
router.put('/doctors/unverify/:doctorId', viewDoctorController.unverifyDoctor);

module.exports = router;
