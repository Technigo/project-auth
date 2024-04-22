import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { authenticateUser } from "../authenticateUser.js";

dotenv.config();

const router = express.Router();

const geneerateToken = (user) => {
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
