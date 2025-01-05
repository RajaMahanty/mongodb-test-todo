const express = require("express");
const { UserModel, TodoModel, connectToDatabase } = require("./db");
const { jwt, auth } = require("./auth");
const { hashPassword, comparePassword } = require("./utils");
const { signUpSchema, signInSchema, todoSchema } = require("./inpvalid");

const app = express();
app.use(express.json());

// connecting to the database
console.log("Server starting...");
connectToDatabase();

app.post("/signup", async (req, res) => {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: result.error.errors,
        });
    }

    const { name, email, password } = result.data;
    const hashedPassword = await hashPassword(password);

    try {
        const result = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Successfully signed up!",
            user: {
                name: result.name,
                email: result.email,
            },
        });
    } catch (error) {
        console.error(`Signup error: ${error.message}`);
        return res.status(500).json({
            message: "Failed to signup!",
        });
    }
});

app.post("/signin", async (req, res) => {
    const result = signInSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: result.error.errors,
        });
    }

    const { email, password } = result.data;

    try {
        const user = await UserModel.findOne({ email });

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

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
                return res.status(200).json({ token });
            }
        );
    } catch (error) {
        console.error(`Signin error: ${error.message}`);
        return res.status(500).json({
            message: "Failed to sign in due to server error!",
        });
    }
});

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const result = todoSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid todo data",
            errors: result.error.errors,
        });
    }

    const { title, done } = result.data;

    try {
        const result = await TodoModel.create({
            userId,
            title,
            done,
        });
        return res.status(201).json({
            message: "Todo created successfully",
            todo: result,
        });
    } catch (e) {
        console.error(`Todo creation error: ${e.message}`);
        return res.status(500).json({
            message: "Failed to create todo",
        });
    }
});

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({ userId });
        return res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (e) {
        console.error(`Todo fetch error: ${e.message}`);
        return res.status(500).json({
            message: "Failed to fetch todos",
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
