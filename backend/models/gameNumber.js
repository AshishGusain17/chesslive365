const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameNumberSchema = new Schema({
  game_number: { type: Number, required: true },
});

const gameNumber = mongoose.model("gameNumber", gameNumberSchema);
module.exports = gameNumber;

