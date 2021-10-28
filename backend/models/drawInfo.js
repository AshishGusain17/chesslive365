const mongoose = require("mongoose");
const { Schema } = mongoose;

const drawInfoSchema = new Schema({
  datetime: { type: Date, default: Date.now },
  expire_at: { type: Date, default: Date.now, expires: 20000 },
  game_number: { type: Number, required: true },
  game_id: {type: Schema.Types.ObjectId, ref: 'chessGames'},
  drawOffer2: {},
});

const drawInfo4Game = mongoose.model("drawInfo4Game", drawInfoSchema);
module.exports = drawInfo4Game;

