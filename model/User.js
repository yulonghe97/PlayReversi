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
  },
  currentRoom:{
      type: String,
  },
  winning_battles:{
      type: Number,
      default: 0
  }
});

userSchema.methods.user_wins = function(callback){
  this.matches++;
  this.winning_battles++;
  const school = this.findSchool();
  school.school_wins();
  console.log("Winning user "+this.name+";gameRecords: "+this.gameRecords+"winning battles:"+winning_battles);
};

userSchema.methods.user_loses = function(callback) {
  this.matches++;
  const school = this.findSchool();
  school.school_loses();
  console.log("Losing user "+this.name+";gameRecords: "+this.gameRecords+"winning battles:"+winning_battles);
};

userSchema.methods.findSchool = function (callback){
  return this.db.model('School').findById(this.school, callback);
}

userSchema.methods.display_battles = function(callback){
  var percentage = winning_battles/matches;
  var rounded = Math.round(percentage * 10) / 10;
  rounded=rounded+"%";
  return rounded,this.matches;
}

module.exports = mongoose.model("User", userSchema);
