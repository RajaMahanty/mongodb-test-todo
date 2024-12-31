const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

async function connectToDatabase() {
    try {
        const result = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to database: ${result.connection.host}`);
        console.log(`Database name: ${result.connection.name}`);
        console.log(`Connection port: ${result.connection.port}`);
    } catch (e) {
        console.error(`Failed to connect to the database: ${e.message}`);
    }
}

const User = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean,
});

const UserModel = new mongoose.model("users", User);
const TodoModel = new mongoose.model("todos", Todo);

module.exports = { UserModel, TodoModel, connectToDatabase };
