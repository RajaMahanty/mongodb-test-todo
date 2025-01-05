const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

async function connectToDatabase() {
    try {
        const result = await mongoose.connect(process.env.MONGODB_URI);
        console.log(
            `Database connected successfully to ${result.connection.host}:${result.connection.port}/${result.connection.name}`
        );
    } catch (e) {
        console.error(`Database connection failed: ${e.message}`);
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

User.set("timestamps", true);
Todo.set("timestamps", true);

const UserModel = new mongoose.model("users", User);
const TodoModel = new mongoose.model("todos", Todo);

module.exports = { UserModel, TodoModel, connectToDatabase };
