# Node.js API Project

This project is a simple Node.js API with pagination, search functionality, and a database seeder.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and MongoDB installed on your machine.

### Installing

1. Install the dependencies:
    ```bash
    npm install
    ```

2. Make sure MongoDB is running. By default `mongodb://localhost:27017/itemdb` is used, make sure to modify the `config.js` if you are using a different route or want to use a different database name.

3. Seed the database with dummy data (optional):
    ```bash
    npm run seed
    ```

4. Start the server:
    ```bash
    npm run dev
    ```
    or 
    ```bash
    npm run start
    ```

The server should now be running on `http://localhost:5001`.

## API Endpoints

- **GET /api/items** - Retrieve all items with pagination and search.
- **GET /api/items/:id** - Retrieve an item by its ID.
- **POST /api/items** - Create a new item.
- **PUT | Patch /api/items/:id** - Update an item by its ID.
- **DELETE /api/items/:id** - Delete an item by its ID.

## Built With

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
