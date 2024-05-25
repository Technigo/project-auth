import bcrypt from "bcrypt";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import expressListEndpoints from "express-list-endpoints";
import asyncHandler from "express-async-handler";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    required: true,
    minlength: 6,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
});

const User = model("User", userSchema);

// Function to generate JWT
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

// Middleware to athenticate the token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//Registration Endpoint
//http://localhost:9000/register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();

    // Generate access token for the registered user
    const accessToken = generateAccessToken(savedUser._id);
    res.status(201).json({ id: savedUser._id, accessToken });
  } catch (err) {
    console.error("Error creating user:", err); // Log the actual error for debugging
    let errorMessage = "Could not create user";
    if (err.code === 11000) {
      // Duplicate key error
      if (err.keyPattern && err.keyPattern.username) {
        errorMessage = "Username already exists";
      } else if (err.keyPattern && err.keyPattern.email) {
        errorMessage = "Email already exists";
      }
    } else if (err.errors) {
      // Validation errors
      const errorFields = Object.keys(err.errors);
      if (errorFields.length > 0) {
        errorMessage = err.errors[errorFields[0]].message;
      }
    }
    res.status(400).json({ message: errorMessage, errors: err.errors });
  }
});

// Sign-in Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user._id);
  await User.findByIdAndUpdate(user._id, { accessToken });
  res.json({ accessToken, username: user.username });
});

// Authenticated endpoint
app.get("/secrets", authenticateToken, (req, res) => {
  res.json({ secret: "This is secret content" });
});

app.get(
  "/logged-in",
  authenticateToken,
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      response: {
        message: "User is logged in",
      },
    });
  })
);

/* const secret = crypto.randomBytes(64).toString("hex");
console.log(secret); */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
console.log("Contents of process.env:", process.env);
