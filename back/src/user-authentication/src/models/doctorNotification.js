const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const DoctorNotification = mongoose.model('DoctorNotification', notificationSchema);

module.exports = DoctorNotification;
