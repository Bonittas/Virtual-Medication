const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId },
  message: String,
  type: String, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
