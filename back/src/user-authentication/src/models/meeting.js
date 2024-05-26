const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  doctorUID: { type: String, required: true },
  patientUID: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
