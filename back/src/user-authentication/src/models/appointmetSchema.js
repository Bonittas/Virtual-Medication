const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  modeOfConsultation: String,
  preferredDateTime: Date,
  symptoms: String,
  status: { type: String, default: 'pending' } // status can be 'pending', 'accepted', 'rejected', etc.
});

module.exports = mongoose.model('Appointment', appointmentSchema);
