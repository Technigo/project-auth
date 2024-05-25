import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

// Importing the Model
import { User } from "./models/userSchema";

// Getting the dotenv file
dotenv.config();

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-authorization";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8088;
const app = express();

//Middleware to Authenticate User
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
// Adding our frontend URL to the cors that way only that URL is allowed to make backend requests.
app.use(cors("https://project-auth-moonlight-flamingos.netlify.app/"));
app.use(express.json());

// API Documentation
app.get("/", (req, res) => {
  try {
    const endpoints = expressListEndpoints(app).map((endpoint) => {
      if (endpoint.path === "/register") {
        endpoint.query = {
          description: `In this endpoint you can register a new user with a POST request. Send a username of at least four characters and a password of at least eight characters in a JSON to set up a new user.`,
        };
      }
      if (endpoint.path === "/login") {
        endpoint.query = {
          description: `In this endpoint you can login in a user with a POST request. Please send the users password and username in a JSON file to log in and acces the token for the user.`,
        };
      }
      if (endpoint.path === "/secrets") {
        endpoint.query = {
          description: `For this endpoint there is only the GET request available if you have a valid access token you will be able to see this endpoint otherwise not.`,
        };
      }
      return endpoint;
    });
    res.status(200).json(endpoints);
  } catch (err) {
    console.error("The following error occured:", err);
    res
      .status(500)
      .send(
        "Sorry, this page is not available at the moment. Please try again later."
      );
  }
});

//Sign Up Endpoint
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    //Check the username
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long" });
    }

    //Check the password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    //Create a User
    const user = new User({
      username: username,
      password: bcrypt.hashSync(password, 10),
    });
    await user.save();
    res.status(201).json({
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

// Login Endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //Find the user by username in the Database
    const user = await User.findOne({ username: username });

    //Compare the password of the found user
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

//Secrets Endpoint
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.status(200).json({ secret: `Super secrets... nobody will know. Well other signed in people will know I guess...` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
