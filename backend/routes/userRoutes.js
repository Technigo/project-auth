import express from "express";
import { UserModel } from  "../models/UserModel";
import bcrypt from "bcrypt"; //hash and store passwords
import jwt from "jsonwebtoken"; //authentication and authorization 
import asyncHandler from "express-async-handler"; //simplify error handling in async code (all http requests are async requests)
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); //Create and instance of the Express router


// Set up a function that generates a JWT token for user authentication
const generateToken = (user) => { //param = user
    return jwt.sign({vid: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h", // Token expires after 24 hours
    });
};