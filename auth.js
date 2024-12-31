const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
    console.log("Authenticating request...");
    const token = req.headers.token;

    if (!token) {
        console.log("No JWT token provided in headers");
        return res.status(403).json({ message: "JWT token not provided!" });
    }

    try {
        console.log("Verifying JWT token...");
        const result = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully");
        req.userId = result.userId;
        next();
    } catch (e) {
        console.error(`Token verification failed: ${e.message}`);
        return res.status(500).json({ message: "Failed to validate the user" });
    }
}

module.exports = { jwt, auth };
