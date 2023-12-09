import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";

// For SIGN IN.
// User authentication - Hash password. Hide passwords.
import bcrypt from "bcrypt";

// ---------- START OF registerUserController ----------
// @desc    Register new user
// @route   POST api/register
// @access  Public

export const registerUserController = asyncHandler(async (req, res) => {
  // Extract email, username and password from the request body
  const { username, password, email } = req.body;

  try {
    // 1st Condition.
    if (!username || !password || !email) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // 2nd Condition.
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

    // Generate a salt and hash the user's password.
    // Hashing transforms the password into a secure and irreversible string of characters.
    const salt = bcrypt.genSaltSync(10);

    // The resulting hashedPassword is what we store in the database to keep the user's password safe.
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance with the hashed password.
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user instance to the database with mongoose method.
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
    // Handle any errors that occur during the registration process.
    res.status(500).json({ success: false, response: e.message });
  }
});
// ---------- END OF registerUserController ----------

// ---------- START OF loginUserController ----------
// @desc    Login Existing User
// @route   POST api/login
// @access  Public

export const loginUserController = asyncHandler(async (req, res) => {
  // Extract email, username and password from the request body.
  const { username, password } = req.body;

  try {
    // Find a user with the provided username in the database.
    const user = await UserModel.findOne({ username });

    // 401 Unauthorized and a user not found message.
    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // If it doesn't match with the stored password.
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
// ---------- END OF loginUserController ----------

// ---------- START OF usersController ----------
export const usersController = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0, accessToken: 0 }); // Exclude sensitive fields from the response
    res.status(200).json({ success: true, response: users });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});
// ---------- END OF usersController ----------

// ---------- START OF authController ----------
export const authController = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ success: true, response: "On secret site" });
  } catch (e) {
    res.status(401).json({ success: false, response: e.message });
  }
});
// ---------- END OF authController ----------