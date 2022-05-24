import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Codealong with Van, then Daniel
const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 5) {
      throw "Password must be at least 5 characters long";
    }
    const newUser = await new User({
      username,
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
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
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
    const user = await User.findOne({ accessToken });
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
app.get("/welcome", authenticateUser);
app.get("/welcome", (req, res) => {
  res.json("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
