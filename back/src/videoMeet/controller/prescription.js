const Prescription = require('../model/prescription');
// const Doctor = require('../../../user-authentication/src/models/Doctor'); 
exports.createPrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = new Prescription({ patientName, date, time, disease, medications, doctor: doctorId });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Prescriptions for the logged-in doctor
exports.getAllPrescriptions = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescriptions = await Prescription.find({ doctor: doctorId });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Prescription by ID (only if it belongs to the logged-in doctor)
exports.getPrescriptionById = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Prescription (only if it belongs to the logged-in doctor)
exports.updatePrescription = async (req, res) => {
  try {
    const { patientName, date, time, disease, medications } = req.body;
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
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

// Delete Prescription (only if it belongs to the logged-in doctor)
exports.deletePrescription = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated doctor's details
    const prescription = await Prescription.findOne({ _id: req.params.id, doctor: doctorId });
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