require("dotenv").config();

// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Extract the request body from incoming HTTP requests
const cors = require("cors"); // To enable Cross-Origin Resource Sharing

// Import Comicbook routes
const comicBooksRoutes = require("./routes/comicBooks");

// local database: mongodb://localhost:27017/bookStore
const dbUrl = process.env.DB_URL;

// Connect to the database
mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database connection failed :( " + err);
    });

// Use body-parser middleware
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Use comicBooks route
app.use("/api/comic-books", comicBooksRoutes);

// Routes that does not exist
app.all("*", (req, res) => {
    res.send("Resource does not exist. ");
})

app.listen(3000, () => {
    console.log("Server started successfully");
})