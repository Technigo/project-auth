import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate a JWT token for user authentication
const generateToken = (user) => {
  // Use a fallback value if not set
  const jwtSecret = process.env.JWT_SECRET || "default_secret";
  // Generate a JWT token for the user for the new user using the user Id.
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "24h",
  });
};

// Controller to check if the user is authenticated
export const addRegisterController = asyncHandler(async (req, res) => {
  const { username, password } = req.body; // Get the username and password from the request body.
  try {
    // Check if the username and password are provided
    if (!username || !password) {
      res.status(401).json({ error: "Missing username or password" }); // 401 is unauthorized
      return;
    }
    // Check if the user already exists in the database.
    const existingUser = await UserModel.findOne({ username });
    // If the user already exists, return an error message.
    if (existingUser) {
      res
        .status(409)
        .json({ error: `User with username '${username}' already exists` }); // 409 is conflict, a user with the same username already exists.
      return;
    }

    // Generate a salt and hash the password. We are using the bcrypt library to create a random value (salt) and then hash the password with the salt. The salt is then stored in the database with the hashed password. This is making it harder for hackers to crack the password.
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt.
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance with the username and hashed password.
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    // Save the user to the database.
    await newUser.save();
    // Return a success message with the user details.
    res.status(201).json({
      success: true,
      response: {
        // Return the user details and a JWT token for the user.
        id: newUser._id,
        username: newUser.username,
        accessToken: generateToken(newUser._id), // Generate a JWT token for the user for the new user using the user Id.
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); // Return an error message if something goes wrong with the database, the server or connection.
  }
});

// Use the express-async-handler package to handle errors
export const loginUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username and password are provided
    const user = await UserModel.findOne({ username });
    if (!user) {
      // If the user does not exist, return an error message.
      return res
        .status(401) // 401 is unauthorized
        .json({ success: false, response: "User not found" }); // Return an error message if the user does not exist.
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password); // Compare the password provided with the hashed password in the database.
    if (!isMatch) {
      return res
        .status(401) // 401 is unauthorized
        .json({ success: false, response: "Incorrect password" }); // Return an error message if the password is incorrect.
    }
    // Return a success message with the user details.
    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        accessToken: generateToken(user._id), // Generate a JWT token for the user for the new user using the user Id.
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); // Return an error message if something goes wrong with the database, the server or connection.
  }
});
