
# Bookstore REST API
This is a RESTful API built using Node.js, Express.js, and MongoDB. The API provides endpoints for creating, reading, updating, and deleting books along with options to Sort and Filter books based on multiple factors.

**Interact with the API:** [Bookstore API](https://bookstore-api-r2r0.onrender.com/api/comic-books).

## Postman Collection
View the [Postman collection available here](https://www.postman.com/avionics-geologist-27790568/workspace/my-space/collection/25813116-616701ba-3719-4d13-90de-0be9eea0fe8f?action=share&creator=25813116).

## Usage

Use this format for Inserting records:
  {
    "title": "Alchemist",
    "author": "Paulo Coelho",
    "publishedOn": "1960",
    "price": 899,
    "discount": 50,
    "totalPages": 418,
    "condition": "Like new",
    "genre": ["Horror", "Fantasy"]
  }

### Endpoints

1. **GET** /api/comic-books/: Returns a list of all books. 
2. **GET** /api/comic-books/:id : Returns the book with the given ID. 
3. **POST** /api/comic-books: Creates a new book. 
4. **PATCH** /api/comic-books/:id : Updates the book with the given ID. 
5. **DELETE** /api/comic-books/:id : Deletes the book with the given ID.

### Sorting and Filtering

1. **GET** /api/comic-books?sortBy=price&sortOrder=desc: Sort books by price
2. **GET** /api/comic-books/?sortBy=discount&sortOrder=asc: Sort books by discount 
3. **GET** /api/comic-books?genre=Superhero: Filter books by genre
4. **GET** /api/comic-books/?min_price=1500&max_price=2000: Filter books with a minimum price of 1500 and maximum price of 2000

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

## Contact

If you have any questions or want to reach out to me, feel free to contact me at [renjithroy06@gmail.com](mailto:renjithroy06@gmail.com).