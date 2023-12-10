// Import necessary libraries and modules
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel'; // Import the User model
import { generateToken } from '../utils/jwtUtils'; // Import the JWT utility function

// Create an instance of an Express router
const router = express.Router();

// Define a POST endpoint for user registration
router.post('/users', async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, email, password } = req.body;

        // Create a new User instance with hashed password
        const user = new User({ name, email, password: bcrypt.hashSync(password) });

        // Save the user to the database
        await user.save();

        // Generate a JWT token for the registered user
        const payload = { userId: user._id, email: user.email };
        const token = generateToken(payload);

        // Respond with a success status and the user ID and access token
        res.status(201).json({ id: user._id, accessToken: token });
    } catch (err) {
        // Handle errors during user registration

        console.error('User Registration Error:', err);

        // Check if the error is due to a duplicate email (unique index violation)
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email is already in use.' });
        } else {
            // For other errors, respond with a generic error message
            res.status(500).json({ message: 'Could not create user. Please try again later.' });
        }
    }
});

// Export the router for use in other files
export default router;
