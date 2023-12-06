import { AdvertiserModel } from "../models/advertiser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate a JWT token containing the user's unique ID, with an optional secret key and a 24-hour expiration time
const generateToken = (advertiser) => {
    return jwt.sign({ id: advertiser._id}, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });
};

export const showAllUsersController = asyncHandler(async (req, res) => {
    const users = await AdvertiserModel.find();
    res.status(200).json(users);
});

export const registerUserController = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(400).json({message: "Please add all fields", error: err.errors});
        } else {
            const existingUser = await AdvertiserModel.findOne({
                $or: [{ username }, { email }]
            });
            
            if (existingUser) {
                res.status(400).json({message: `User with ${existingUser.username = username ? "username" : "email"} already exists`})
            };

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newAdvertiser = new AdvertiserModel({
                username,
                email,
                password: hashedPassword
            });

            await newAdvertiser.save();

            res.status(201).json ({
                success: true,
                response: {
                    username: newAdvertiser.username,
                    email: newAdvertiser.email,
                    id: newAdvertiser._id,
                    accessToken: generateToken(newAdvertiser._id)
                }
            });
        };
    } catch (err) {
        res.status(500).json({ success: false, response: err.message });
    }
});

export const signinUserController = asyncHandler(async (req, res) => {
    // Retrieve username and password from req.body
    const { username, password } = req.body;
    
    // Find a user with the provided username in the database
    try {
        const user = await AdvertiserModel.findOne({ username });
        if (!user) {
            // If no user is found with the provided username, return status 401 Unauthorized and message "User not found"
            res.status(401).json({ success: false, response: "User not found"}); 
        };

        // If a user is found with the provided username, compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, response: "Incorrect password"});
        };

        res.status(200).json({ success: true, response: {
            username: user.username,
            id: user._id,
            accessToken: generateToken(user._id)
        }});

    } catch (err) {
        res.status(500).json({ success: false, response: err.message});
    };
})