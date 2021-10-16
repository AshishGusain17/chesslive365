const mongoose = require("mongoose");
const { Schema } = mongoose;

const liveChessSchema = new Schema({
  datetime: { type: Date, default: Date.now },
  game_id: { type: Number, required: true },
  user_count: { type: Number, required: true },
  allPositions2: {},
  glowSqs2: {},
  turn2: { type: Number, required: true },
  pieceClicked2: {},
  enpassant2: {},
  currPGN2: { type: String }
});

const liveGames = mongoose.model("chessGames", liveChessSchema);
module.exports = liveGames;

