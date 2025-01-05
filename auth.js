const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({ message: "JWT token not provided!" });
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = result.userId;
        next();
    } catch (e) {
        console.error(`Authentication failed: ${e.message}`);
        return res.status(500).json({ message: "Failed to validate the user" });
    }
}

module.exports = { jwt, auth };
