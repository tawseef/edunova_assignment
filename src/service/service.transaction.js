const TransactionDB = require("../modal/transactios.modal");
const BookDB = require("../modal/book.modal");

const postIssueTransaction = async (bookId, userId, issueDate) => {
  try {
    const transaction = new TransactionDB({ bookId, userId, issueDate });
    await transaction.save();
  } catch (error) {
    throw error;
  }
};

const postReturnTransaction = async (bookId, userId, returnDate) => {
  try {
    const transaction = await TransactionDB.findOne({
      bookId,
      userId,

      returnDate: null,
    });

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    const daysRented = Math.ceil(
      (new Date(returnDate) - transaction.issueDate) / (1000 * 60 * 60 * 24)
    );
    const book = await BookDB.findById(bookId);
    const rent = daysRented * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.rent = rent;
    await transaction.save();

    return transaction;
  } catch (error) {
    throw error;
  }
};

const transactionByBookId = async (bookId) => {
  try {
    const transactions = await TransactionDB.find({ bookId }).populate(
      "userId"
    );
    const currentTransaction = transactions.find((tr) => !tr.returnDate);
    const issuedBy = transactions.map((tr) => tr.userId.name);
    const result = {
      totalIssued: issuedBy.length,
      currentlyIssuedBy: currentTransaction
        ? currentTransaction.userId.name
        : "Not currently issued",
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const transactionBookTotalRent = async (bookId) => {
  try {
    const transactions = await TransactionDB.find({
      bookId,
      returnDate: { $ne: null },
    });
    const totalRent = transactions.reduce((sum, tr) => sum + tr.rent, 0);
    return totalRent;
  } catch (error) {
    throw error;
  }
};

const transactionBookIssueToUser = async (userId) => {
  try {
    const transactions = await TransactionDB.find({ userId }).populate(
      "bookId"
    );
    const booksIssued = transactions.map((tr) => tr.bookId.name);
    return booksIssued;
  } catch (error) {
    throw error;
  }
};

const transactionByDate = async (startDate, endDate) => {
  try {
    const transactions = await TransactionDB.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("bookId userId");

    const result = transactions.map((tr) => ({
      book: tr.bookId.name,
      issuedTo: tr.userId.name,
    }));

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postIssueTransaction,
  postReturnTransaction,
  transactionByBookId,
  transactionBookTotalRent,
  transactionBookIssueToUser,
  transactionByDate,
};
