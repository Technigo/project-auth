import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8082;
const app = express();

// Middlewares:
app.use(cors());
app.use(express.json());

// Codealong with Van, then Daniel
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

// API Landing
app.get("/", (req, res) => {
  res.send({
    "Justine's and Simon's app": "Welcome to our authentication API",
    "Created for": "Technigo",
    Project: "Week 20",
  });
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({
        response: "Choose a different name or log into an existing account",
        success: false,
      });
    } else if (password.length < 8) {
      res.status(400).json({
        response: {
          message: "Password must be at least 8 characters long",
        },
        success: false,
      });
    } else {
      console.log(password);
      console.log(username);
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken,
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password does not match",
        success: false,
      });
    }
  } catch (error) {
    res.status(404).json({ response: error, success: false });
  }
});

// Authentication
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: "Please log in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Post authentication
// app.get("/", authenticateUser);
app.get("/", (req, res) => {
  res.send("You are logged in");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
