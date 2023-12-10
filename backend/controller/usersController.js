// Import necessary libraries and modules
import bcrypt from 'bcryptjs';
import User from '../models/userModel'; // Import the User model
import { generateToken } from '../utils/jwtUtils'; // Import the JWT utility function

// Controller function for user registration
export const registerUser = async (req, res) => {
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
};

// Controller function for user login
export const loginUser = async (req, res) => {
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
};
