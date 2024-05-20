import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import expressListEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Model
const User = mongoose.model("User", {
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

// Middleware to authenticate user with access token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

const port = process.env.PORT || 8082;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Registration endpoint to create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// Route to access secrets after authentication
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({ secret: "This is a super secret message" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
