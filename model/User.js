const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  school: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  matches:{
    type: Number,
    default: 0,
  },
  gameRecords:{
      type: [mongoose.Schema.Types.ObjectID],
      ref: 'Game',
  }
});

module.exports = mongoose.model("User", userSchema);
