import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";
import bcrypt from "bcrypt";
import crypto from "crypto";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

//create schema and model

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = model("User", userSchema);

//defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

//add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//middleware to check if database is available
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "service unavailable" });
  }
});

//middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401),
      json({ loggedOut: true, message: "you have to log in to get access" });
  }
};

//registration endpoint
app.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).json({
      success: true,
      message: "User created",
      id: user._id,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not create user",
      errors: error,
    });
  }
});

//login endpoint
app.post("/login", async (req, res) => {
  //find user by name
  const user = await User.findOne({ name: req.body.name });
  //check if password is correct
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(401).json({ message: "user name or password invalid" });
  }
});

//authenticated endpoint
app.get("/dashboard", authenticateUser);
app.get("/dashboard", (req, res) => {
  res.json({
    secret: "This is the secret dashboard!",
  });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //success
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    //failure
    res.json({ notFound: true });
  }
});

//route to list all endpoints
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
