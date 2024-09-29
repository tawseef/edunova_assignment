const httpStatus = require("http-status");
const {
  getBooksBySearch,
  getBooksRentByRange,
  getFilteredBooks,
} = require("../service/service.book");

const handleGetFunction = async (req, res) => {
  const { term } = req.params;
  const response = await getBooksBySearch(term);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleRentRangeFunction = async (req, res) => {
  const { min, max } = req.params;
  const response = await getBooksRentByRange(min, max);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

const handleFilterFunction = async (req, res) => {
  const response = await getFilteredBooks(req.query);
  if (response) res.send(httpStatus.OK).json(response);
  else res.send(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

module.exports = {
  handleGetFunction,
  handleRentRangeFunction,
  handleFilterFunction,
};
