const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issueDate: Date,
  returnDate: Date,
  rent: Number,
});

const TransactionDB = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionDB;
