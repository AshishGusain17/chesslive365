const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
});

const User = mongoose.model("userCollection", UserSchema);
module.exports = User;
