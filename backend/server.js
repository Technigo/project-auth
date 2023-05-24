// Import required modules
import express from "express"; // Importing the Express module
import cors from "cors"; // Importing the CORS module
import mongoose from "mongoose"; // Importing the Mongoose module
import crypto from "crypto"; // Importing the Crypto module
import bcrypt from "bcrypt"; // Importing the Bcrypt module

// Set the MongoDB URL
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Define the port the app will run on
const port = process.env.PORT || 8000;

// Create an Express app
const app = express();

// Add middlewares to enable CORS and JSON body parsing
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello Technigo!"); // Send a response with the message "Hello Technigo!"
});

// Define the User schema for the MongoDB collection
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex") // Generate a random access token using the Crypto module
  }
});

// Create a User model based on the User schema
const User = mongoose.model("User", UserSchema);

// Define the registration route ("/register")
app.post("/register", async (req, res) => {
  const { username, password } = req.body; // Extract the username and password from the request body

  try {
    const salt = bcrypt.genSaltSync(); // Generate a salt for password hashing using the Bcrypt module
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt) // Hash the password using the generated salt
    }).save(); // Create a new User instance and save it to the database

    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e
    });
  }
});

// Define the login route ("/login")
app.post("/login", async (req, res) => {
  const { username, password } = req.body; // Extract the username and password from the request body

  try {
    const user = await User.findOne({ username: username }); // Find a user with the provided username in the database

    if (user && bcrypt.compareSync(password, user.password)) {
      // Check if the user exists and the provided password matches the hashed password in the database
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    });
  }
});

// Define the Thought schema for the MongoDB collection
const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  hearts: {
    type: Number,
    default: 0
  },
  user: {
    type: String,
    require: true
  }
});

// Create a Thought model based on the Thought schema
const Thought = mongoose.model("Thought", ThoughtSchema);

// Middleware function to authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization"); // Extract the access token from the request header

  try {
    const user = await User.findOne({ accessToken: accessToken }); // Find a user with the provided access token in the database

    if (user) {
      next(); // Call the next middleware or route handler if the user exists
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    });
  }
};

// Define the route for fetching thoughts ("/thoughts")
app.get("/thoughts", authenticateUser);
app.get("/thoughts", async (req, res) => {
  const accessToken = req.header("Authorization"); // Extract the access token from the request header
  const user = await User.findOne({ accessToken: accessToken }); // Find the user associated with the access token
  const thoughts = await Thought.find({ user: user._id }); // Find all thoughts associated with the user's ID

  res.status(200).json({ success: true, response: thoughts });
});

// Define the route for creating a new thought ("/thoughts")
app.post("/thoughts", authenticateUser);
app.post("/thoughts", async (req, res) => {
  const { message } = req.body; // Extract the message from the request body
  const accessToken = req.header("Authorization"); // Extract the access token from the request header
  const user = await User.findOne({ accessToken: accessToken }); // Find the user associated with the access token
  const thought = await new Thought({ message: message, user: user._id }).save(); // Create a new Thought instance and save it to the database

  res.status(200).json({ success: true, response: thought });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
