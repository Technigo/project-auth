import express from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt"; //hash and store passwords
import jwt from "jsonwebtoken"; //authentication and authorization 
import asyncHandler from "express-async-handler"; //simplify error handling in async code (all http requests are async requests)
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); //Create and instance of the Express router


// Set up a function that generates a JWT token for user authentication
const generateToken = (user) => { //param = user
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { //JWT_SECRET to be defined in .env for security reasons
        expiresIn: "24h", // Token expires after 24 hours
    });
};

//Set up a route to handle user registration (Sign-up)
router.post("/register", asyncHandler(async (req, res) => {

    const { username, password, email } = req.body; //defines what to request from the body

    try {
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please fill in all fields"); //error message shown on the server side
        }

        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            res.status(400);
            throw new Error(
                `User with ${existingUser.username === username ? "username" : "email"
                } already exists`
            );
        }

        const salt = bcrypt.genSaltSync(10); //Add extra layers of security

        const hashedPassword = bcrypt.hashSync(password, salt);

        //create a new user instance with the hashed password
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword, //passes the variable with the encrypted password
        });

        await newUser.save(); //Mongoose method to save the new user instance to the database

        // Respond with a success message, user details, and the JWT token
        res.status(201).json({
            success: true,
            response: {
                username: newUser.username,
                email: newUser.email,
                id: newUser._id,
                accessToken: generateToken(newUser._id), // Generate a JWT token
            },
        });
    } catch (e) {
        // Handle any errors that occur during the registration process
        res.status(500).json({ success: false, response: e.message });
    }
})
);

//Set up a route for logging in 
router.post("/login", asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, response: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, response: "Incorrect Password" });
        } res.status(200).json({
            success: true,
            response: {
                username: user.username,
                id: user._id,
                accessToken: generateToken(user._id),
            },
        });
    } catch (e) {
        // Handle any errors that occur during the login process
        res.status(500).json({ success: false, response: e.message });
    }
})
);

// Export the router 
export default router; 