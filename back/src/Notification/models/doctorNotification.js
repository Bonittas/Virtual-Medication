const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  type: String, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
