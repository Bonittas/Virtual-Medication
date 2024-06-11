// models/Prescription.js

const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  instructions: { type: String },
});

const prescriptionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true },
  disease: { type: String },
  medications: { type: [medicationSchema], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
