const mongoose = require("mongoose");

const bookShelfSchema = new mongoose.Schema({
  bookshelfId: [
    {
      type: Number,
      required: true,
    },
  ],
  shelfPosition: [
    {
      type: String,
      required: true,
    },
  ],
  shelfCategory: [
    {
      type: String,
      required: true,
    },
  ],
  booksOnShelf: [
    {
      type: Number,
      required: true,
    },
  ],
});

const bookShelf = mongoose.model("bookShelf", bookShelfSchema);
module.exports = { bookShelf };
