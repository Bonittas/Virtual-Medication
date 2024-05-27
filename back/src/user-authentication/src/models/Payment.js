const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  phone: String,
  email: String,
  address: String,
  appointmentDate: Date,
  appointmentTime: String,
  symptoms: String,
  medicalHistory: String,
  amount: Number,
  currency: String,
  tx_ref: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Payment', PaymentSchema);
