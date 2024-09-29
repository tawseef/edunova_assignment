const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: String,
  category: String,
  rentPerDay: Number,
});

const BookDB = mongoose.model("Book", BookSchema);

module.exports = BookDB;
