# MongoDB Test Todo

## Overview

MongoDB Test Todo is a Node.js application that provides a RESTful API for user authentication and todo management. It leverages Express for handling HTTP requests, Mongoose for MongoDB interactions, and JSON Web Tokens (JWT) for secure authentication.

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
    git clone https://github.com/RajaMahanty/mongodb-test-todo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd mongodb-test-todo
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

    Or for development with auto-reload:

    ```bash
    npm run dev
    ```

2. The server will be running on `http://localhost:3000` (or the PORT specified in your .env file).

## API Endpoints

-   **POST /signup**: Register a new user.
-   **POST /signin**: Authenticate a user and receive a JWT.
-   **POST /todo**: Create a new todo item (requires authentication).
-   **GET /todos**: Retrieve all todos for the authenticated user.

## Environment Variables

The application uses the following environment variables:

-   `MONGODB_URI`: Your MongoDB connection string
-   `JWT_SECRET`: Secret key for JWT token generation/validation
-   `PORT`: Port number for the server (defaults to 3000)

Make sure to set these variables in your `.env` file before running the application. You can use the provided `.env.example` as a template.

## Known Issues and Future Improvements

1. Password is not hashed ✔️
2. A single crash (duplicate email) crashes the whole app ✔️
3. Add more endpoints (mark todo as done)
4. Add timestamp at which todo was created/the time it needs to be done by ✔️
5. Relationships in Mongo
6. Add validations to ensure email and password are correct format ✔️
