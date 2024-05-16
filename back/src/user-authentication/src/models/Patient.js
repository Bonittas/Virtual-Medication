const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  medicalSpeciality: String,
  age: Number,
  gender: String,
  degree: String,
  regNumber: String,
  yearOfReg: String,
  stateMedicalCouncil: String,
  experience: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  startTime: String,
  endTime: String,
  imageUrl: String,

});

module.exports = mongoose.model('Patient', patientSchema);
