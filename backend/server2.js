// Importing necessary modules
import express from "express"; // Express.js framework for building web applications
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing
import mongoose from "mongoose"; // MongoDB object modeling tool
import crypto from "crypto"; // Node.js module for cryptographic operations
import bcrypt from "bcrypt"; // Library for password hashing

// Establishes the connection URL for MongoDB. It uses the environment variable MONGO_URL if available, otherwise defaults to "mongodb://localhost/project-mongo"
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";

// Connect to the MongoDB database using the defined URL and options
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Set the Promise implementation for Mongoose to use
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server using an environment variable.
const port = process.env.PORT || 8080;

// Create an instance of the Express application
const app = express();

// Add middlewares to enable CORS (Cross-Origin Resource Sharing) and JSON body parsing
app.use(cors());
app.use(express.json());

// Route to handle the root URL path ("/") and sends a response of "Hello Technigo!" to the client
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Defines a UserSchema for the user model in the MongoDB database
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
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

// Creates a User model based on the UserSchema
const User = mongoose.model("User", UserSchema);

// Registration route ("/register") to handle user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Generate a salt using bcrypt
    const salt = bcrypt.genSaltSync();
    
    // Create a new User instance with the provided username and hashed password
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save();
    
    // Respond with a success status and the newly created user's information
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    });
  } catch (e) {
    // Respond with an error status and the encountered error
    res.status(400).json({
      success: false,
      response: e
    });
  }
});

// Login route ("/login") to handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a user with the provided username in the database
    const user = await User.findOne({ username: username });
    
    // Check if the user exists and the entered password matches the stored hashed password
    if (user && bcrypt.compareSync(password, user.password)) {
      // Respond with a success status and the user's information
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      // Respond with an error status indicating that the credentials do not match
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      });
    }
  } catch (e) {
    // Respond with an error status and the encountered error
    res.status(500).json({
      success: false,
      response: e
    });
  }
});

// Defines a ThoughtSchema for the thought model in the MongoDB database
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

// Creates a Thought model based on the ThoughtSchema
const Thought = mongoose.model("Thought", ThoughtSchema);

// Middleware function to authenticate the user before accessing certain routes
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    // Find a user with the provided access token in the database
    const user = await User.findOne({ accessToken: accessToken });
    
    if (user) {
      // If the user exists, proceed to the next middleware/route handler
      next();
    } else {
      // If the user does not exist, respond with an unauthorized status
      res.status(401).json({
        success: false,
        response: "Please log in"
      });
    }
  } catch (e) {
    // Respond with an error status and the encountered error
    res.status(500).json({
      success: false,
      response: e
    });
  }
};

// Route ("/thoughts") to get all thoughts from the database. Requires authentication.
app.get("/thoughts", authenticateUser);
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({});
  
  // Respond with a success status and the retrieved thoughts
  res.status(200).json({ success: true, response: thoughts });
});

// Route ("/thoughts") to add a new thought to the database. Requires authentication.
app.post("/thoughts", authenticateUser);
app.post("/thoughts", async (req, res) => {
  const { message } = req.body;
  const accessToken = req.header("Authorization");
  
  // Find the user associated with the provided access token
  const user = await User.findOne({ accessToken: accessToken });
  
  // Create a new Thought instance with the provided message and the user's ID
  const thought = await new Thought({ message: message, user: user._id }).save();
  
  // Respond with a success status and the newly created thought
  res.status(200).json({ success: true, response: thought });
});

// Starts the server and listens for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
