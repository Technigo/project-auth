import { UserModel } from "../models/userModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
//import jwt from "jsonwebtoken";

export const registerUserController = asyncHandler(async (req, res) => {
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
        accessToken: newUser.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Username:", username);
    console.log("Password:", password);

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" });
    }

    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        accessToken: user.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});
