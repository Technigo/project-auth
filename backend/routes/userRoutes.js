// Import necessary modules
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

// Initialize express router
const userRoutes = express.Router();

// Route for user registration
userRoutes.post("/register", async (req, res) => {
    try {
        // Extract email, username, and password from request body
        const { email, userName, password } = req.body;

        // Check if user already exists
        const userAlreadyExists = await User.exists({ email });
        if (userAlreadyExists !== null) {
            // If user exists, send error response
            res.status(400).json({ message: "Could not register" });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = await User.create({ email, userName, passwordHash });

        // Send success response with user details
        res.status(201).json({
            email: user.email,
            userName: user.userName,
            accessToken: user.accessToken,
        });
    } catch (error) {
        // If any error occurs, send error response
        res.status(400).json({ message: "Could not register" });
    }
});

// Route for user sign in
userRoutes.post("/signin", async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user) {
        // If user exists, compare provided password with stored hash
        const hasCorrectPassword = await bcrypt.compare(password, user.passwordHash);
        if (hasCorrectPassword) {
            // If password is correct, send success response with user details
            res.status(200).json({
                email: user.email,
                userName: user.userName,
                accessToken: user.accessToken,
            });
        } else {
            // If password is incorrect, send error response
            res.status(401).json({ message: "Could not sign in" });
        }
    } else {
        // If user does not exist, send error response
        res.status(401).json({ message: "Could not sign in" });
    }
});

// Export the router
export default userRoutes;