import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"; // It generates a very long random string, like a second id
import bcrypt from "bcrypt"; // To hash and unhash the password

// bcrypt method used in this project:
//bcrypt.genSaltSync() to randomize
//bcrypt.hashSync() to hash
//bcrypt.compareSync() to compare

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Schema: part of the Model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Unique identifier for authentication when signing in
  accessToken: {
    type: String,
    // creates the accessToken by randomizing a string (128 is the length), hex means letters (if removed it generates symbols).
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// User model that uses the UserSchema
const User = mongoose.model("User", UserSchema);

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

const Thought = mongoose.model("Thought", ThoughtSchema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Authentication:  to check if you are a user
const authenticateUser = async (req, res, next) => {
  // Authorization: When signed in this authorizes what you have access to and can do
  const accessToken = req.header("Authorization");

  try {
    // Checks if user has an accessToken
    const user = await User.findOne({ accessToken });
    // If it does we can proceed with sign in
    if (user) {
      next();
      // If not, the user is prompted to sign in
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Executes authenticateUser function
app.get("/thoughts", authenticateUser);
// If accessToken is found the user is signed in
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({});
  res.status(201).json({ response: thoughts, success: true });
});

app.post("/thoughts", async (req, res) => {
  const { message } = req.body;

  try {
    const newThought = await new Thought({ message }).save();
    res.status(201).json({ response: newThought, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Endpoint to sign up
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // To randomize password
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" };
    }
    // Creating a new user and generating an _id: "shshj5k4773sddf"
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt), // here we hash the password and randomize it before saving it to the database
    }).save();

    res.status(201).json({
      // Instead of sending the whole newUser model, we refer to them by key value as to leave out the password for security reasons.
      response: {
        userId: newUser._id,
        username: newUser.userName,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Endpoint to sign in: Here we check if the user model exist in database above.
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // Checking if user and password already exists
    // comparing if password entered by the user (normal) sent in the body is the same as the password(hashed) saved in the database
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
      res.status(404).jason({
        response: "Username or password does not match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
