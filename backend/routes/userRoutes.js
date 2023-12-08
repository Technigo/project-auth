import express from 'express';
import User from './userModel'; // Import the User model

// Create an instance of the Express Router
const router = express.Router();

// Route for user registration ('/register')
router.post('/register', async (req, res) => {
    // Extract user input from the request body
    const { username, password } = req.body;

    try {
        // Create a new user instance with the provided username and password
        const newUser = new User({ username, password });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle validation errors or other issues during registration
        res.status(400).json({ error: 'Registration failed. Please check your input.' });
    }
});

// Route for user sign-in ('/signin')
router.post('/signin', async (req, res) => {
    // Extract user credentials from the request body
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

        // Send a success response
        res.json({ message: 'User signed in successfully' });
    } catch (error) {
        // Handle any errors that occur during the sign-in process
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router for use in other files
export default router;

// Explanation:

// The '/register' route handles user registration. It creates a new user instance, saves it to the database, and returns a success message.
// The '/signin' route handles user sign-in. It searches for the user by the provided username, compares the entered password with the hashed password in the database, and returns a success message if the credentials are valid.
// Both routes handle potential errors and return appropriate responses.