import express from 'express';
import User from '../models/userModel'; // Import the User model

// Create an instance of the Express Router
const router = express.Router();

// Middleware to handle user authentication
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username in the database
        const user = await User.findOne({ username });

        // If the user is not found, return an error
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await user.comparePassword(password);

        // If the password is not valid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If the password is valid, generate and attach the access token to the request object
        const accessToken = 'generateYourAccessTokenHere'; // Replace with your token generation logic
        user.accessToken = accessToken;
        await user.save(); // Save the updated user with the access token

        // Send a response with the access token
        res.json({ accessToken });
    } catch (error) {
        // Handle any errors that occur during the authentication process
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router for use in other files
export default router;

