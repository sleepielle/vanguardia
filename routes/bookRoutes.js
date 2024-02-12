var express = require("express");
var router = express.Router();
const booksController = require("../controllers/bookController");

//C
router.post("/createBook", booksController.createBook);

//R
router.get("/getAllBooks", booksController.getAllBooks);
router.get("/getBookById/:id", booksController.getBookById);

//U
router.put("/updateBookById/:id", booksController.updateBook);

//D
router.delete("/removeBookById/:id", booksController.removeBook);

module.exports = router;
