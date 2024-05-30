import express from "express";
import User from "../model/user-model";
import {
  authenticateUser,
  logoutUser,
  isLoggedIn,
} from "../middleware/Middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET || "toast is the best secret";
const router = express.Router();

//check if user already exists
router.post("/exists", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({
        exists: true,
        message: "User already exists",
      });
    } else {
      res.status(200).json({
        exists: false,
        message: "User does not exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "An error occurred while checking if user exists",
      error: error.message,
    });
  }
});

// add user
router.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check for duplicate user, and ensure that the input is treated as a literal value ($eq) to protect against NoSQL injection
    const existingUser = await User.findOne({ email: { $eq: email } });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exists" });
    }
    const newUser = await new User({
      name,
      email,
      password,
    }).save();

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: newUser._id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      userId: newUser._id,
      accessToken: newAccessToken,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

//log in user
router.post("/session", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      //generate the access token
      const newAccessToken = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: "1h",
      });
      // Send the access token back to the client
      res.json({
        userId: user._id,
        accessToken: newAccessToken,
        role: user.role,
      });
    } else {
      res.status(400).json({ notFound: true, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
});

//route to verify if token is valid with middleware isLoggedIn
router.get("/verify", authenticateUser, isLoggedIn, (req, res) => {
  res.json({ message: "You are logged in" });
});

//route to get user role
router.get("/role", authenticateUser, (req, res) => {
  res.json({ role: req.user.role });
});

// Route to log out user
router.post("/logout", authenticateUser, logoutUser, (req, res) => {
  res.json({ message: "You are now logged out" });
});

// Patch request to update user
router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

export default router;
