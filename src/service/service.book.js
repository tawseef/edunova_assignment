const BookDB = require("../modal/book.modal");

const getBooksBySearch = async (term) => {
  try {
    const books = await BookDB.find({ name: { $regex: term, $options: "i" } });

    return books;
  } catch (error) {
    throw error;
  }
};

const getBooksRentByRange = async (min, max) => {
  try {
    const books = await BookDB.Book.find({
      rentPerDay: { $gte: min, $lte: max },
    });
    return books;
  } catch (error) {
    throw error;
  }
};

const getFilteredBooks = async ({ category, term, minRent, maxRent }) => {
  try {
    const books = await BookDB.find({
      category,
      name: { $regex: term, $options: "i" },
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });

    return books;
  } catch (error) {
    throw error;
  }
};

module.exports = { getBooksBySearch, getBooksRentByRange, getFilteredBooks };
