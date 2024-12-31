# MongoDB Improved

## Overview

MongoDB Improved is a Node.js application that provides a RESTful API for user authentication and todo management. It leverages Express for handling HTTP requests, Mongoose for MongoDB interactions, and JSON Web Tokens (JWT) for secure authentication.

## Features

-   **User Signup and Signin**: Users can create an account and log in using their email and password.
-   **JWT Authentication**: Secure endpoints with JWT to ensure only authenticated users can access certain routes.
-   **Todo Management**: Authenticated users can create and retrieve their todo items.

## Technologies Used

-   **Node.js**: JavaScript runtime for building the server-side application.
-   **Express**: Web framework for handling HTTP requests and routing.
-   **Mongoose**: ODM for MongoDB, providing a straightforward schema-based solution to model application data.
-   **JWT**: For secure authentication and authorization.

## Project Structure

-   `index.js`: Main entry point of the application, setting up routes and starting the server.
-   `db.js`: Handles database connection and defines Mongoose models for users and todos.
-   `auth.js`: Middleware for authenticating requests using JWT.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mongodb-improved.git
    ```

2. Navigate to the project directory:

    ```bash
    cd mongodb-improved
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    node index.js
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

-   **POST /signup**: Register a new user.
-   **POST /signin**: Authenticate a user and receive a JWT.
-   **POST /todo**: Create a new todo item (requires authentication).
-   **GET /todos**: Retrieve all todos for the authenticated user.

## MongoDB connection

To set up the MongoDB connection:

1. Create a MongoDB Atlas account or use your local MongoDB installation
2. Replace the connection string in `db.js` with your own:
    ```javascript
    mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
    ```
3. Set your JWT secret key in `auth.js` by updating the `JWT_SECRET` variable
