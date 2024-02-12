const mongoose = require("mongoose");
const BookShelf = require("../models/bookShelfModel");
const Book = require("../models/bookModel");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DATABASE_URL);
    console.log("Successfully connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

const connectMiddleware = async (req, res, next) => {
  await connectToDatabase();
  next();
};

const createBookShelf = async (req, res) => {
  try {
    const newBookShelf = new BookShelf(req.body);
    await newBookShelf.save();
    res
      .status(201)
      .json({ message: "Bookshelf created successfully", status: 201 });
  } catch (error) {
    console.error("Error creating bookshelf:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const deleteBookShelf = async (req, res) => {
  try {
    await BookShelf.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Bookshelf deleted successfully", status: 200 });
  } catch (error) {
    console.error("Error deleting bookshelf:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const updateBookShelf = async (req, res) => {
  try {
    await BookShelf.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ message: "Bookshelf updated successfully", status: 200 });
  } catch (error) {
    console.error("Error updating bookshelf:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const getBookShelf = async (req, res) => {
  try {
    const bookShelves = await BookShelf.find();
    res.status(200).json(bookShelves);
  } catch (error) {
    console.error("Error getting bookshelves:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const getBookShelfById = async (req, res) => {
  try {
    const bookShelf = await BookShelf.findById(req.params.id);
    if (!bookShelf) {
      return res
        .status(404)
        .json({ message: "Bookshelf not found", status: 404 });
    }
    res.status(200).json(bookShelf);
  } catch (error) {
    console.error("Error getting bookshelf by ID:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const addBookToBookShelf = async (req, res) => {
  try {
    const { idShelf, idBook } = req.body;

    const shelf = await BookShelf.findById(idShelf);
    if (!shelf) {
      return res
        .status(404)
        .json({ message: "Bookshelf not found", status: 404 });
    }

    const book = await Book.findById(idBook);
    if (!book) {
      return res.status(404).json({ message: "Book not found", status: 404 });
    }

    if (shelf.books.includes(idBook)) {
      return res
        .status(400)
        .json({ message: "The book is already in the shelf", status: 400 });
    }

    shelf.books.push(book._id);
    await shelf.save();
    res
      .status(200)
      .json({ message: "Book added to shelf successfully", status: 200 });
  } catch (error) {
    console.error("Error adding book to shelf:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

const moveBookFromShelf = async (req, res) => {
  try {
    const { actualShelfId, newShelfId, bookId } = req.params;

    const actualShelf = await BookShelf.findById(actualShelfId);
    const newShelf = await BookShelf.findById(newShelfId);

    if (!actualShelf || !newShelf) {
      return res
        .status(404)
        .json({ message: "One of the shelves was not found", status: 404 });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found", status: 404 });
    }

    actualShelf.books = actualShelf.books.filter(
      (libId) => libId.toString() !== bookId
    );
    newShelf.books.push(book._id);

    await actualShelf.save();
    await newShelf.save();

    res
      .status(200)
      .json({ message: "Book moved successfully from shelf", status: 200 });
  } catch (error) {
    console.error("Error moving book from shelf:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

module.exports = {
  connectMiddleware,
  createBookShelf,
  deleteBookShelf,
  updateBookShelf,
  getBookShelf,
  getBookShelfById,
  addBookToBookShelf,
  moveBookFromShelf,
};
