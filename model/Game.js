const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  board:{
      type: [String],
      required: true,
  },
  currentPlayers: {
    type: [mongoose.Schema.Types.ObjectID],
    ref: "User",
    required: true,
  },
  lastMove:{
      type: [String]
  },
  isStarted:{
      type: Boolean,
      default: false,
  },
  isFinished:{
      type: Boolean,
      default: false
  },
  winner:{
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
  },
});

module.exports = mongoose.model("Game", gameSchema);
