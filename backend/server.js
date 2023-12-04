import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
//import bcrypt from "bcryptjs"; //? 

//Har kört npm i och install mongoose && bcryptjs

// Set up MongoDB connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Define the User model for MongoDB
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

// Middleware to authenticate users based on the access token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')});
  if (user) { 
    req.user = user;
    next();
  } else {
    res.status(400).json({loggedOut: true});
  }
};

// Define the port for the server
const port = process.env.PORT || 8080;
const app = express();
var bcrypt = require('bcryptjs'); //Hämtat från https://www.npmjs.com/package/bcryptjs som var länkad i technigos material

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

// Root route
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Route to create users
app.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    // Hash the password before saving it to the database
    const user = new User({name, email, password: bcrypt.hashSync(password)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  }
  catch (err) {
    res.status(400).json({message: 'Could not create user', errors: err.errors});
  }
})

// Protected route with user authentication middleware
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({secret: "Super secret message"})
});

// Route for user login sessions
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  // Compare the hashed password with the provided password
  if (user && bcrypt.compareSync(req.body.password , user.password)){
    res.json({userId: user._id, accessToken: user.accessToken});
  } else {
    res.json({notFound:true});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
