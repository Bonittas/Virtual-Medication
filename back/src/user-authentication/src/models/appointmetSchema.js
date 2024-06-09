const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  modeOfConsultation: {
    type: String,
    required: true,
  },
  preferredDateTime: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
