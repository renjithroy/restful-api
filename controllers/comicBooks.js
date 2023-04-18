// Import ComicBook model and Mongoose library
const ComicBook = require("../models/comicBooks");
const mongoose = require("mongoose");


// GET all books
module.exports.getAllBooks = async (req, res) => {
    try {
        // Create an empty filter object to store the query parameters (title, author, genre, etc)
        const filter = {};

        // Check if query parameter is present and add it to the filter object as a regular expression with case-insensitive options
        if (req.query.title) filter.title = { $regex: req.query.title, $options: 'i' };
        if (req.query.author) filter.author = { $regex: req.query.author, $options: 'i' };

        // Check if query parameter is present and add it to the filter object
        if (req.query.publishedOn) filter.publishedOn = req.query.publishedOn;
        if (req.query.pages) filter.pages = req.query.pages;
        if (req.query.condition) filter.condition = req.query.condition;
        if (req.query.genre) filter.genre = req.query.genre;

        // Get min and max price from the request query parameters
        let min_price = req.query.min_price;
        let max_price = req.query.max_price;

        if (min_price && max_price) {
            // If both min and max prices are present, filter based on both
            filter.price = { $gte: min_price, $lte: max_price };
        } else if (min_price) {
            // If only min price is present, filter based on it
            filter.price = { $gte: min_price };
        } else if (max_price) {
            // If only max price is present, filter based on it
            filter.price = { $lte: max_price };
        }

        // Create an empty sort object to store the query parameters - sortBy and sortOrder
        const sort = {};

        // If sortBy parameter is present, proceed. Ex: price || genre || author
        if (req.query.sortBy) {
            // If sortOrder parameter is desc, set sort[sortOrder] as -1 (represents descending). 
            // Ex: If sortBy is price and sortOrder is desc, then sort["price"] = -1 will create sort = {price: -1}
            // Ex: If sortBy is discount and sortOrder is asc, then sort["discount"] = 1 will create sort = {discount: 1}
            if (req.query.sortOrder === 'desc') {
                sort[req.query.sortBy] = -1;
            } else {
                sort[req.query.sortBy] = 1;
            }
        };

        // Query the database for all comic books matching the filter, sorted as specified in the sort object
        const comicBooks = await ComicBook.find(filter).sort(sort);
        res.status(200).json(comicBooks);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Couldn't fetch data from database" + err.message });
    }
}

// GET a single book by ID
module.exports.getSingleBook = async (req, res) => {
    try {
        const id = req.params.id;
        const comicBook = await ComicBook.findOne({ _id: id });
        if (!comicBook) {
            return res.status(404).json({ error: "Couldn't find the book you're looking for." });
        }
        res.status(200).json(comicBook);
    } catch (err) {
        res.status(500).json({ error: "Sorry, there was an error finding the book." });
    }
}

module.exports.createNewBook = async (req, res) => {
    // Create new book with values from request body
    try {
        const newComicBook = new ComicBook({
            title: req.body.title,
            author: req.body.author,
            publishedOn: req.body.publishedOn,
            price: req.body.price,
            discount: req.body.discount,
            totalPages: req.body.totalPages,
            condition: req.body.condition,
            genre: req.body.genre,
        })

        const savedComicBook = await newComicBook.save();
        console.log(savedComicBook);
        res.status(201).json(savedComicBook);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to insert new comic book. " + err.message });
    }
}

module.exports.updateBook = async (req, res) => {
    // UPDATE a book by ID
    try {
        const id = req.params.id;
        const comicBook = await ComicBook.findOne({ _id: id });
        if (comicBook) {
            /* If the book is found, update its properties with the values from the request body 
                else default to old value */
            comicBook.title = req.body.title || comicBook.title;
            comicBook.author = req.body.author || comicBook.author;
            comicBook.publishedOn = req.body.publishedOn || comicBook.publishedOn;
            comicBook.price = req.body.price || comicBook.price;
            comicBook.discount = req.body.discount || comicBook.discount;
            comicBook.totalPages = req.body.totalPages || comicBook.totalPages;
            comicBook.condition = req.body.condition || comicBook.condition;
            comicBook.genre = req.body.genre || comicBook.genre;
        }
        const updatedBook = await comicBook.save(); // Save the updated book to the database
        res.status(200).json(updatedBook); // Return the updated book as a response
    } catch (err) {
        res.status(422).json({ error: "Sorry, could not update the book. " + err.message });
    }
}

module.exports.deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await ComicBook.findByIdAndRemove(id);
        if (!deletedBook) {
            // If there are no books with the input id, return error message
            return res.status(404).json({
                error: "Sorry, could not find the book to delete.",
            });
        }
        // If book deleted successfully, respond with success message
        res.status(200).json({ message: "Book deleted successfully." });
    } catch (err) {
        // If request cannot be processed by server for some reason, return error message
        res.status(500).json({
            error: "Sorry, could not delete the book. " + err.message,
        });
    }
}