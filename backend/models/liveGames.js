const mongoose = require("mongoose");
const { Schema } = mongoose;

const liveChessSchema = new Schema({
  datetime: { type: Date, default: Date.now },
  expire_at: { type: Date, default: Date.now, expires: 20000 },
  game_number: { type: Number, required: true },
  user_count: { type: Number, required: true },
  allPositions2: {},
  glowSqs2: {},
  turn2: { type: Number, required: true },
  pieceClicked2: {},
  enpassant2: {},
  currPGN2: { type: String },
  castlePossible2: {},
  drawOffer2: {},
  gameEnd2: { type: Number, required: true }
});

const liveGames = mongoose.model("chessGames", liveChessSchema);
module.exports = liveGames;

