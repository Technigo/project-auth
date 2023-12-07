import { UserModel } from "../models/UserModel";

import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";



// Function to generate a JWT token for user authentication
const generateToken = (user) => {
  // Generate a JWT token containing the user's unique ID, with an optional secret key and a 24-hour expiration time
  return jwt.sign({ accessToken: user.accessToken }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
};


export const registerUserController = asyncHandler(async (req, res) => {
  // Extract email, username and password from the request body
  const { username, password, email } = req.body;
  
  try {
    
    if (!username || !email || !password) {
      
      res.status(400);
      
      throw new Error("Please add all fields");
    }
    
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    // Create a new user instance with the hashed password
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond with a success message, user details, and the JWT token
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        
        accessToken: newUser.accessToken, 
      },
    });
  } catch (e) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ success: false, response: e.message });
  }
});


export const loginUserController = asyncHandler(async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Find a user with the provided username in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" });
    }

    // Respond with a success message, user details, and the JWT token
    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        
        accessToken: user.accessToken, //  token for the user using the acessToken generated from the model
      },
    });
  } catch (e) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, response: e.message });
  }
});
