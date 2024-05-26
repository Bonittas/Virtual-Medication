const mongoose = require('mongoose');

const patientNotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const PatientNotification = mongoose.model('PatientNotification', patientNotificationSchema);

module.exports = PatientNotification;
