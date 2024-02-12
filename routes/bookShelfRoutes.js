var express = require("express");
var router = express.Router();
const bookShelfController = require("../controllers/bookShelfController");

//C
router.post("/createBookShelf", bookShelfController.createBookShelf);
router.post("/addBookToBookShelf", bookShelfController.addBookToBookShelf);

//R
router.get("/getAllBookshelves", bookShelfController.getBookShelf);
router.get("/getBookShelfById/:id", bookShelfController.getBookShelfById);

//U
router.put("/updateBookShelfById/:id", bookShelfController.updateBookShelf);
router.put("/moveBookFromBookshelf/", bookShelfController.moveBookFromShelf);

//D
router.delete("/removeBookShelfById/:id", bookShelfController.deleteBookShelf);

module.exports = router;
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
