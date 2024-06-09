// controllers/prescriptionController.js

const Prescription = require('../model/prescription');

// Create Prescription
exports.createPrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const prescription = new Prescription({ patientName, date, time, disease, medications });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Prescription
exports.updatePrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const prescription = await Prescription.findById(req.params.id);
    if (prescription) {
      prescription.patientName = patientName;
      prescription.date = date;
      prescription.time = time;
      prescription.disease = disease;
      prescription.medications = medications;
      await prescription.save();
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Prescription
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (prescription) {
      await prescription.remove();
      res.json({ message: 'Prescription deleted' });
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
