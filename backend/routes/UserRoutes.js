import express from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

// JWT Token Generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

//Authentication Middleware
const authMiddleware = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
if (!authorizationHeader && req.method !== 'POST') {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
}
//Extract token from Authorization header
const token = authorizationHeader ? authorizationHeader.replace('Bearer ', '') : '';

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select('-password');

    req.user = user;
    next();
} catch (error) {
    res.status(401).json({ error: "You do not have the possibility to view this content." });
    }
};

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add an input in all fields");
    }

    const userExists = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists, please try again");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Authenticate User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Something went wrong, please try again");
    }
});

// Authenticated Endpoint
router.route('/content')
    .all(authMiddleware) // Apply authMiddleware to all methods
    .get(asyncHandler(async (req, res) => {
    
     // Send additional user information in the GET response
     res.json({ 
        success: true,
        message: "This content is protected.", 
        userDetails: {
            username: req.user.username,
            email: req.user.email,
        },
        customData: {
            // Add any additional data you want to include
            example: "Additional information here",
        }
    });
}))
    .post(asyncHandler(async (req, res) => {
// Handle POST request logic here
        // For example, you can access data from req.body
        const postData = req.body;

        // Process the data as needed

        // Send a response
        res.json({
            success: true,
            message: "POST request processed successfully",
            data: postData,
        });
    }));

export default router;
