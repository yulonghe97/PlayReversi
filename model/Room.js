const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  currentPlayers: {
    type: [mongoose.Schema.Types.ObjectID],
    ref: "User",
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Game",
    required: true,
  },
  isFull: {
    type: Boolean,
    required: true,
    default: false,
  },
  isOngoing: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  spectators:{
      type: [mongoose.Schema.Types.ObjectID],
      ref: "User",
      required: true,
  },
  sessionId: {
    type: [String],
  },
});

module.exports = mongoose.model("Room", roomSchema);
