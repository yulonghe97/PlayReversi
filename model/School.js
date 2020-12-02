const mongoose = require("mongoose");
const user = require('./User.js');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
    },
    students:{
        type: [{type: mongoose.Schema.Types.ObjectID, ref: 'User'}],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    winningBattles:{
        type: Number,
        default: 0
    },
    numBattles:{
        type: Number,
        default: 0
    }
});

schoolSchema.methods.school_wins = function (){

    this.numBattles++;
    this.winning_battles++;
}

schoolSchema.methods.school_loses = function (){
    this.numBattles++;
}

schoolSchema.methods.game_records= function(){
    return this.numBattles, this.winningBattles;
}


module.exports = mongoose.model("School", schoolSchema);
