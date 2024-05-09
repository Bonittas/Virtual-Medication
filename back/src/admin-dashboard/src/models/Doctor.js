const mongoose = require('mongoose');
const Notification = require('../models/doctorNotification')

const doctorSchema = new mongoose.Schema({
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
  Notification: [{
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
