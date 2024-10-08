const express = require("express");
const router = express.Router();
const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secretKey = "VENKATARAMANA_SECRET_TOKEN"; 

// Registering a new user
router.post("/register", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({ error: "Username and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (error) {
            if (error) {
                console.error("Error inserting user:", error.message);
                return response.status(500).json({ error: error.message });
            }
            response.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("Error during registration:", err.message);
        response.status(500).json({ error: err.message });
    }
});


// Loging a user
router.post("/login", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({ error: "Username and password are required" });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (error, user) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        }
        if (!user) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '60d' });
        response.json({ token });
    });
});


module.exports = router;
