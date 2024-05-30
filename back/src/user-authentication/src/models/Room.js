const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  roomName: {
    type: String,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming User schema for participants
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
