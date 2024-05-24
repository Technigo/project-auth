import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

dotenv.config();
const { Schema } = mongoose;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-authentication";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, minLength: 8 },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: { type: String, required: true },
  accessToken: { type: String, default: () => bcrypt.genSaltSync() },
});

const User = mongoose.model("User", userSchema);

const port = process.env.PORT || 8080;
const app = express();

// Function for authenticate by token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      message: "Could not authorise.",
      success: false,
      error: "You are not allowed to see our top secret message!",
    });
  }
};

// Add middlewares to enable cors and json body parsing
app.use(
  cors({
    origin: "https://team-peace-auth.netlify.app",
    methods: ["GET", "POST"],
  }) // Allow sending credentials from frontend to backend
);
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Sign-up
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await user.save();
    res.status(201).json({ message: "Sign up successfully", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Could not sign up.",
      success: false,
      error: error.message,
    });
  }
});

// Log-in
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: "Login Successful.",
        success: true,
        accessToken: user.accessToken,
      });
    } else if (user) {
      res.status(401).json({
        message: "Could not login.",
        success: false,
        error: "Incorrect password",
      });
    } else {
      res.status(401).json({
        message: "Could not login.",
        success: false,
        error: "Invalid username",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Could not login. Something is wrong.",
      success: false,
      error: error.message,
    });
  }
});

// secrets - Authentication method 2 - by Token
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.username,
    message: "This is a super secret message",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
