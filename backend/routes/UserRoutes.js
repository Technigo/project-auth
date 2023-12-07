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
router.get('/content', asyncHandler(async (req, res) => {
    console.log('Entire request object:', req);
    const authorizationHeader = req.header('Authorization');
    console.log('Received Authorization header:', authorizationHeader);

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
        return;
    }
    
    const token = authorizationHeader.replace('Bearer ', '');
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select('-password');

        //Send additional user information in the response
        res.json({ 
            message: "This content is protected.", 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(401).json({ error: "You do not have the possibility to view this content." });
    }
}));


export default router;
