/*
This code sets up the routes for ComicBooks API.
It uses the express.Router() middleware to define the routes and
the ComicBook controller to handle the requests.
*/

const express = require("express");
const router = express.Router();

// Import ComicBook controller
const comicBooks = require("../controllers/comicBooks");

router.route("/")
    .get(comicBooks.getAllBooks)  //GET all books
    .post(comicBooks.createNewBook) // CREATE a new book


// Route for getting, updating, and deleting a single book by ID

router.route("/:id")
    .get(comicBooks.getSingleBook) // GET a single book
    .patch(comicBooks.updateBook) // UPDATE a book
    .delete(comicBooks.deleteBook) // DELETE a book

module.exports = router;