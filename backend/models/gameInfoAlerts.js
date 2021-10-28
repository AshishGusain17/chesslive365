const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameInfoSchema = new Schema({
  datetime: { type: Date, default: Date.now },
  expire_at: { type: Date, default: Date.now, expires: 20000 },
  game_number: { type: Number, required: true },
  game_id: {type: Schema.Types.ObjectId, ref: 'chessGames'},
  drawOffer2: {},
  gameEnd2: { type: Number, required: true },
});

const gameInfoAlerts = mongoose.model("gameInfoSchema", gameInfoSchema);
module.exports = gameInfoAlerts;

