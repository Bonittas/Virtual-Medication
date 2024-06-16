const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  modeOfConsultation: String,
  preferredDateTime: Date,
  symptoms: String,
  status: { type: String, default: 'pending' } // status can be 'pending', 'accepted', 'rejected', etc.
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  medicalSpeciality: String,
  age: Number,
  gender: String,
  degree: String,
  stateMedicalCouncil: String,
  experience: String,
  address1: String,
  address2: String,
  city: String,
  country: String,
  startTime: String,
  endTime: String,
  imageUrl: String,
  cvUrl: String,
            
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  notifications: [notificationSchema],
  prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }] // Added prescriptions relationship
});

module.exports = mongoose.model('Doctor', doctorSchema);
