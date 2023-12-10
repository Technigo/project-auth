// authRoutes.js
import express from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import authenticateUser from '../middleware/authMiddleware';
import crypto from 'crypto';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email is already taken
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Generate a unique secret key for the user
        const secretKey = crypto.randomBytes(32).toString('hex');

        // Create a new user instance with the secret key
        const newUser = new User({ username, email, password, secretKey });
        // Save the new user to the database
        await newUser.save();

        // Use jsonwebtoken to create a token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ accessToken });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for user login ('/login')
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Use jsonwebtoken to create a token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

export default router;





// authUserRoutes.js
// import express from 'express';
// import User from '../models/userModel';
// import jwt from 'jsonwebtoken';
// // import authenticateUser from '../middleware/authMiddleware';

// // Create an instance of the Express Router
// const router = express.Router();

// // Route for user login ('/login')
// router.post('/login', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Find the user by either username or email
//         const user = await User.findOne({ $or: [{ username }, { email }] });

//         if (!user) {
//             return res.status(401).json({ error: 'Invalid username, email, or password' });
//         }

//         const isPasswordValid = await user.comparePassword(password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid username, email, or password' });
//         }

//         const secretKey = generateRandomKey();
//         const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });

//         res.json({ accessToken });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route for user signup ('/signup')
// router.post('/signup', async (req, res) => {
//     console.log('Received signup request');
//     const { username, email, password } = req.body;

//     console.log('Received POST request at /user/signup');

//     try {
//         // Check if the username or email is already in use
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });

//         if (existingUser) {
//             return res.status(400).json({ error: 'Username or email already in use' });
//         }

//         // Create a new user instance with the provided username, email, and password
//         const newUser = new User({ username, email, password });
//         // Save the new user to the database
//         await newUser.save();

//         console.log('User saved successfully');

//         // Send a success response
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         // Handle validation errors or other issues during registration
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Export the router for use in other files
// export default router;


// Explanation:

// The '/register' route handles user registration. It creates a new user instance, saves it to the database, and returns a success message.
// The '/signin' route handles user sign-in. It searches for the user by the provided username, compares the entered password with the hashed password in the database, and returns a success message if the credentials are valid.
// Both routes handle potential errors and return appropriate responses.

// Registration (/register route):

// When a new user is registered, you create a new instance of the User model using const newUser = new User({ username, password });.
// The userModel.js file contains a pre-save middleware using bcrypt that automatically hashes the password before saving it to the database. This ensures that the actual password is not stored in the database.

// Sign-In (/signin route):

// When a user attempts to sign in, you find the user in the database based on the provided username using const user = await User.findOne({ username });.
// If the user is found, you use the comparePassword method from the userModel.js file. This method compares the entered password with the hashed password stored in the database. It internally uses bcrypt to perform this comparison.
// If the password is valid, the user is signed in successfully.