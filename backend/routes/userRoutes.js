import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js"; // Make sure to import your user model here

import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { authenticateUser } from "../authenticateUser.js"; // If you have an authentication middleware, import it here

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
  // Function to generate JWT token
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Route for user registration
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    try {
      // Check if all required fields are provided
      if (!username || !password || !email) {
        res.status(400);
        throw new Error("Please provide all fields");
      }
      // Check if user with the same username or email already exists
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
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      // Respond with success message and token
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          email: newUser.email,
          id: newUser._id,
          accessToken: generateToken(newUser),
        },
      });
    } catch (e) {
      // Handle any errors
      res.status(500).json({ success: false, response: e.message });
    }
  })
);

// Route for user login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      // Find user by username
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, response: "User not found" });
      }
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, response: "Incorrect password" });
      }
      // Respond with success message and token
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          email: user.email,
          id: user._id,
          accessToken: generateToken(user),
        },
      });
    } catch (error) {
      // Handle any errors
      res.status(500).json({
        success: false,
        response: {
          message: error.message,
        },
      });
    }
  })
);

// Sample route accessible only to logged-in users
router.get(
  "/logged-in",
  authenticateUser, // Authentication middleware to verify JWT token
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      response: {
        message: "User is logged in",
      },
    });
  })
);

export default router;

/*import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { authenticateUser } from "../authenticateUser.js";

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    try {
      if (!username || !password || !email) {
        res.status(400);
        throw new Error("please add all fields");
      }
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        res.status(400);
        throw new Error(
          `user with ${
            existingUser.username === username ? "username" : "email"
          } already exists`
        );
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          email: newUser.email,
          id: newUser._id,
          accessToken: geneerateToken(newUser),
        },
      });
    } catch (e) {
      res.status(500).json({ success: false, response: e.message });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, response: "user not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, response: "incorrect password" });
      }
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          email: user.email,
          id: user._id,
          accessToken: geneerateToken(user),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        response: {
          message: error.message,
        },
      });
    }
  })
);

router.get(
  "/logged-in",
  authenticateUser,
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      response: {
        message: "user is logged in",
      },
    });
  })
);

export default router;
*/
