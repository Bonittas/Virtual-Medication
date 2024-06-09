// routes/prescriptionRoutes.js

const express = require('express');
const router = express.Router();
const prescriptionController = require('../controller/prescription');

// Routes
router.post('/prescriptions', prescriptionController.createPrescription);
router.get('/prescriptions', prescriptionController.getAllPrescriptions);
router.get('/prescriptions/:id', prescriptionController.getPrescriptionById);
router.put('/prescriptions/:id', prescriptionController.updatePrescription);
router.delete('/prescriptions/:id', prescriptionController.deletePrescription);

module.exports = router;
