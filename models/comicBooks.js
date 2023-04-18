const mongoose = require("mongoose");

const comicBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedOn: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        enum: ["New", "Like new", "Very good", "Good", "Fair", "Poor"],
        required: true,
    },
    genre: {
        type: [String],
        enum: ["Superhero", "Science Fiction", "Fantasy", "Horror", "Mystery", "Comedy", "Romance", "Drama", "Historical", "Manga"],
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("ComicBook", comicBookSchema);
