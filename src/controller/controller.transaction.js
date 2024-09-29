const httpStatus = require("http-status");
const {
  postIssueTransaction,
  postReturnTransaction,
  transactionByBookId,
  transactionBookTotalRent,
  transactionBookIssueToUser,
  transactionByDate,
} = require("../service/service.transaction");

const handleIssueTransaction = async (req, res) => {
  const { bookId, userId, issueDate } = req.body;
  const response = await postIssueTransaction(bookId, userId, issueDate);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleReturnTransaction = async (req, res) => {
  const { bookId, userId, returnDate } = req.body;
  const response = await postReturnTransaction(bookId, userId, returnDate);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleBookTransaction = async (req, res) => {
  const { bookId } = req.params;
  const response = await transactionByBookId(bookId);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleTotalRentTransaction = async (req, res) => {
  const { bookId } = req.params;
  const response = await transactionBookTotalRent(bookId);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleBookIssueToUser = async (req, res) => {
  const { userId } = req.params;
  const response = await transactionBookIssueToUser(userId);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleTransactionDates = async (req, res) => {
  const { startDate, endDate } = req.query;
  const response = await transactionByDate(startDate, endDate);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

module.exports = {
  handleIssueTransaction,
  handleReturnTransaction,
  handleBookTransaction,
  handleTotalRentTransaction,
  handleBookIssueToUser,
  handleTransactionDates,
};
