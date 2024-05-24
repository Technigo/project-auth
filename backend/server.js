import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import { User } from "./models/userSchema";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-authorization";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8088;
const app = express();

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({
      username: username,
      password: bcrypt.hashSync(password, 10),
    });
    await user.save();
    res
      .status(201)
      .json({
        message: "Registration Complete!",
        id: user._id,
        accessToken: user.accessToken,
      });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not register user.", error: err.errors });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        res.status(202).json({
          message: "Logged in",
          id: user._id,
          username: user.username,
          accessToken: user.accessToken,
        });
      } else {
        res.status(401).json({ message: "This password is incorrect." });
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Somethings wrong with the sign in. Please try again later.",
      error: err.message,
    });
  }
});

app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({ secret: `Super secrets... nobody will know.` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
