const express = require("express");
const { UserModel, TodoModel, connectToDatabase } = require("./db");
const { jwt, auth } = require("./auth");

const app = express();
app.use(express.json());

// connecting to the database
console.log("Attempting to connect to database...");
connectToDatabase();

app.post("/signup", async (req, res) => {
    console.log("Received signup request");
    console.log("Request body:", req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        console.log("Missing required fields in signup request");
        return res.status(400).json({
            message: "Please provide all three requirements!",
        });
    } else {
        try {
            console.log("Attempting to create new user...");
            const result = await UserModel.create({
                name,
                email,
                password,
            });
            console.log("User created successfully:", result);

            return res.status(201).json({
                message: "Successfully signed up!",
                user: {
                    name: result.name,
                    email: result.email,
                },
            });
        } catch (error) {
            console.error(
                `Encountered an error during signup: ${error.message}`
            );
            return res.status(500).json({
                message: "Failed to signup!",
            });
        }
    }
});

app.post("/signin", async (req, res) => {
    console.log("Received signin request");
    console.log("Request body:", req.body);

    const email = req.body.email;
    const password = req.body.password;

    try {
        console.log("Attempting to find user...");
        const user = await UserModel.findOne({
            email,
            password,
        });
        console.log("User search result:", user);

        if (!user) {
            console.log("Invalid credentials provided");
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        console.log("User found, generating token...");
        // Use promisified version of jwt.sign
        jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) {
                    console.error("Token generation failed:", err);
                    return res.status(500).json({
                        message: "Token generation failed",
                    });
                }
                console.log("Token generated successfully");
                return res.status(200).json({ token });
            }
        );
    } catch (error) {
        console.error(`Encountered an error during signin: ${error.message}`);
        return res.status(500).json({
            message: "Failed to sign in due to server error!",
        });
    }
});

app.post("/todo", auth, async (req, res) => {
    console.log("Received request to create todo");
    console.log("Request body:", req.body);

    const userId = req.userId;
    console.log("User ID from token:", userId);

    const title = req.body.title;
    const done = req.body.done;
    console.log("Title:", title);
    console.log("Done:", done);

    if (!title || done === undefined) {
        console.log("Missing required fields");
        return res
            .status(400)
            .json({ message: "Provide both fields title and done" });
    }

    try {
        console.log("Attempting to create todo...");
        const result = await TodoModel.create({
            userId,
            title,
            done,
        });
        console.log("Todo created successfully:", result);
        return res.status(201).json({
            message: "Todo created successfully",
            todo: result,
        });
    } catch (e) {
        console.error(`Failed to create todo: ${e.message}`);
        return res.status(500).json({
            message: "Failed to create todo",
        });
    }
});

app.get("/todos", auth, async (req, res) => {
    console.log("Received request to get todos");
    const userId = req.userId;
    console.log("User ID from token:", userId);

    try {
        console.log("Attempting to fetch todos...");
        const todos = await TodoModel.find({ userId });
        console.log("Todos fetched successfully:", todos);
        return res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (e) {
        console.error(`Failed to fetch todos: ${e.message}`);
        return res.status(500).json({
            message: "Failed to fetch todos",
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Server started. Listening on port no: ${process.env.PORT || 3000}`
    );
});
