const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: [
    {
      type: Number,
      required: true,
    },
  ],
  bookName: [
    {
      type: String,
      required: true,
    },
  ],
  bookAuthor: [
    {
      type: String,
    },
  ],
  bookPageNumber: [
    {
      type: Number,
    },
  ],
  bookISBN: [
    {
      type: String,
    },
  ],
  bookCopies: [
    {
      type: Number,
    },
  ],
  publicationDate: [
    {
      type: Date,
    },
  ],
  publishingHouse: [
    {
      type: String,
    },
  ],
  gender: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: String,
    },
  ],
  bookEdition: [
    {
      type: Number,
    },
  ],
});

const bookModel = mongoose.model("books", bookSchema);
module.exports = { bookModel };
