const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    modeOfConsultation: String,
    preferredDateTime: Date,
    symptoms: String,
    status: { type: String, default: 'pending' } // status can be 'pending', 'accepted', 'rejected', etc.
  });
  module.exports = mongoose.model('Appointment', appointmentSchema);
