const mongoose = require("mongoose");
const { Schema } = mongoose;

const liveChessSchema = new Schema({
  datetime: { type: Date, default: Date.now },
  turn: { type: Number, required: true }
});

const liveGames = mongoose.model("chessGames", liveChessSchema);
module.exports = liveGames;
