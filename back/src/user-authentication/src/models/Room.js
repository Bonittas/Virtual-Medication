const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Room', RoomSchema);