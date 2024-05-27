import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Recieved registration request");
  console.log("Registering user:", username);

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password securely
    console.log("Hashing password");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password:", hashedPassword);

    // Create new user with hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    console.log("Generating JWT token");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Store token in user document
    user.accessToken = token;
    await user.save();

    console.log("User registered successfully with token:", token);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Attempting login with:", username, password);
  console.log("Request body:", req.body);

  try {
    // Find user by username
    const user = await User.findOne({ username });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Store token in user document
    user.accessToken = token;
    await user.save();

    console.log("Login successfull");
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/protected", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    res.json({ message: "This is protected content" });
  } catch (error) {
    console.error("Protected route error:", error);
    res.status(401).json({ message: "Token is not valid " });
  }
});

export default router;
