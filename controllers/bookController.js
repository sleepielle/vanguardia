const mongoose = require("mongoose");
const Books = require("../models/bookModel");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DATABASE_URL);
    console.log("Connection established successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

async function createBook(req, res) {
  await connectToDatabase();
  const newBook = new Books.book(req.body);
  try {
    await newBook.save();
    res.send({ message: "Book created successfully!", status: "200" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error: " + err, status: "500" });
  }
}

async function removeBook(req, res) {
  await connectToDatabase();
  try {
    await Books.books.deleteOne({ id: req.params.id });
    res.send({ message: "Book removed successfully!", status: "200" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error: " + err, status: "500" });
  }
}

async function updateBook(req, res) {
  await connectToDatabase();
  try {
    await Books.books.updateOne({ id: req.params.id }, req.body);
    res.send({ message: "Book updated successfully!", status: "200" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error: " + err, status: "500" });
  }
}

async function getBooks(req, res) {
  await connectToDatabase();
  try {
    const books = await Books.books.find();
    res.send(books);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error: " + err, status: "500" });
  }
}

async function getBookById(req, res) {
  await connectToDatabase();
  try {
    const book = await Books.books.findOne({ id: req.params.id });
    res.send(book);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error: " + err, status: "500" });
  }
}

module.exports = {
  createBook,
  removeBook,
  updateBook,
  getBooks,
  getBookById,
};
