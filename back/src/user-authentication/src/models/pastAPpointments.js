const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    bloodType: { type: String, required: true },
    bloodPressure: { type: String, required: true },
    disease: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    medication: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
