const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'userCollection'},
  title: { type: String, required: false },
  desc: { type: String, required: false },
  tag: { type: String, default: "All" },
  datetime: { type: Date, default: Date.now },
});

const Notes = mongoose.model("notesCollection", NotesSchema);
module.exports = Notes;
