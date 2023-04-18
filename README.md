
# Bookstore REST API
This is a RESTful API built using Node.js, Express.js, and MongoDB. The API provides endpoints for creating, reading, updating, and deleting books along with options to Sort and Filter books based on multiple factors.

## Installation

1. Clone the repository:

git clone https://github.com/renjithroy/restful-api.git

2. Navigate to the project directory:

cd restful-api

3. Install the dependencies:

npm install

4. Start the server:

node app.js

This will start the server at http://localhost:3000.

## Usage

### Endpoints

**GET** /api/comic-books/: Returns a list of all books.
**GET** /api/comic-books/:id: Returns the book with the given ID.
**POST** /api/comic-books: Creates a new book.
**PATCH** /api/comic-books/:id: Updates the book with the given ID.
**DELETE** /api/comic-books/:id: Deletes the book with the given ID.

Example Request Body for Creating a Comic Book

{
    "title": "Watchmen",
    "author": "Alan Moore",
    "price": 500,
    "discount" : 0,
    "genre": "Science Fiction",
    "publishedOn": "2005",
    "totalPages": 200,
    "condition": "Fair"
}

### Sorting and Filtering

**GET** /api/comic-books?sortBy=price&sortOrder=desc: Sort books by price
**GET** /api/comic-books/?sortBy=discount&sortOrder=asc: Sort books by discount 
**GET** /api/comic-books?genre=Superhero: Filter books by genre
**GET** /api/comic-books/?min_price=1500&max_price=2000: Filter books with a minimum price of 1500 and maximum price of 2000
