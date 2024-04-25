const express = require('express');
const router = express.Router();
const viewPatientController = require('../controllers/viewPatients');

router.get('/patients', viewPatientController.getPatients);

router.put('/patients/verify/:patientId', viewPatientController.verifyPatient);

router.put('/patients/unverify/:patientId', viewPatientController.unverifyPatient);

module.exports = router;
