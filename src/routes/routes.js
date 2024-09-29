/* eslint-disable no-undef */
const express = require("express");
const app = express();
const router = express.Router();

const { handleGetFunction, handleRentRangeFunction, handleFilterFunction } = require("../controller/controller.book")
const { handleIssueTransaction, handleReturnTransaction, handleBookTransaction, handleTotalRentTransaction, handleBookIssueToUser, handleTransactionDates } = require("../controller/controller.transaction")

app.get('/books/search/:term', handleGetFunction)
app.get('/books/rentrange/:min/:max', handleRentRangeFunction)
app.get('/books/filter', handleFilterFunction)
app.post('/transactions/issue', handleIssueTransaction)
app.post('/transactions/return', handleReturnTransaction)
app.get('/transactions/book/:bookId', handleBookTransaction)
app.get('/transactions/totalrent/:bookId', handleTotalRentTransaction)
app.get('/transactions/:userId', handleBookIssueToUser)
app.get('/transactions/dates', handleTransactionDates)

module.exports = router

