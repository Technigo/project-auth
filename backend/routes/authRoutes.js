// Import necessary libraries and modules
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel'; // Import the User model
import { generateToken } from '../utils/jwtUtils'; // Import the JWT utility function

// Create an instance of an Express router
const router = express.Router();

// Define a POST endpoint for user login sessions
router.post('/sessions', async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user with the given email in the database
        const user = await User.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && bcrypt.compareSync(password, user.password)) {
            // Generate a JWT token for the authenticated user
            const payload = { userId: user._id, email: user.email };
            const token = generateToken(payload);

            // Respond with the user ID, access token, and user name
            res.json({ userId: user._id, accessToken: token, name: user.name });
        } else {
            // Respond with a 401 status for invalid email or password
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        // Handle errors during user login

        console.error('User Login Error:', err);

        // Respond with a generic error message for other login failures
        res.status(500).json({ message: 'Could not authenticate. Please try again later.' });
    }
});

// Export the router for use in other files
export default router;
