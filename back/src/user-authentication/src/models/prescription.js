const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  prescription: { type: String, required: true },
  senderUid: { type: String, required: true },
  senderEmail: { type: String, required: true },
  sentAt: { type: Date, required: true },
  appointmentID: { type: String, required: true },
}, {
  timestamps: true,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
