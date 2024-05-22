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
  const accessToken = req.header("Authorization");
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: Access token is missing" });
  }

  const user = await User.findOne({ accessToken });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized: Access token is invalid" });
  }

  req.user = user;
  next();
};

const port = process.env.PORT || 8082;
const app = express();

app.use(cors({
  origin: 'https://cheerful-froyo-159f59.netlify.app'
}));
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

// Login endpoint to authenticate a user
// Find the user by email, if user is found and password is correct, generate and return an access token
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = user.accessToken;
  res.status(200).json({ accessToken });
});

// Route to access secrets after authentication
app.get("/secrets", authenticateUser, (req, res) => {
  res.json({ secret: "This is a super secret message" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
