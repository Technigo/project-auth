import express from 'express';
import User from '../models/userModel'; // Import the User model
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


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
        const secretKey = generateRandomKey();
        const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
        user.accessToken = accessToken;
        await user.save(); // Save the updated user with the access token


        // Send a response with the access token
        res.json({ accessToken });
    } catch (error) {
        // Handle any errors that occur during the authentication process
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Function to generate a random secret key
const generateRandomKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Export the router for use in other files
export default router;

// 'authUser.js':
// Uses the comparePassword method from the User model to check if the entered password matches the hashed password stored in the database.
// This middleware is applied to routes where user authentication is required.



//Explanation:This middleware defines a route ('/login') for handling user login.
// It retrieves the username and password from the request body.
// It searches for the user in the database by the provided username.
// If the user is found, it compares the entered password with the hashed password in the database using the comparePassword method from the 'userModel.js'.
// If the credentials are valid, it generates an access token (you need to replace the placeholder with your actual token generation logic) and attaches it to the user in the database.
// The middleware then sends a response with the access token.

