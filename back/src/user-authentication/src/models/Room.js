const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  // Add other room details as needed
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
