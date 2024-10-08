const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const UserDB = mongoose.model("User", UserSchema);

module.exports = UserDB;
