import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
//import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs"; //? 

//Har kört npm i och install mongoose && bcryptjs

// Set up MongoDB connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Define the User model for MongoDB
const User = mongoose.model('User', {
  username: {
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
const listEndpoints = require("express-list-endpoints");
var bcrypt = require('bcryptjs'); //Hämtat från https://www.npmjs.com/package/bcryptjs som var länkad i technigos material

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

// Root route
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
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
});

// app.post('/users', async (req, res) => {
//   // Extract email, username and password from the request body
//   const { username, password, email } = req.body;

//   try {
   
//     if (!username || !email || !password) {
//       // if so, set http status to a 400code
//       res.status(400);
//       // and throw new error with some info
//       throw new Error("Please add all fields");
//     }
  
//     const existingUser = await UserModel.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (existingUser) {
//       res.status(400);
//       throw new Error(
//         `User with ${
//           existingUser.username === username ? "username" : "email"
//         } already exists`
//       );
//     }


//     const salt = bcrypt.genSaltSync(10);

//     const hashedPassword = bcrypt.hashSync(password, salt);
    
//     const newUser = new UserModel({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({id: user._id, accessToken: user.accessToken})
   
//     res.status(201).json({
//       success: true,
//       response: {
//         username: newUser.username,
//         email: newUser.email,
//         id: newUser._id,
//         accessToken: generateToken(newUser._id), // Generate a JWT token for the new user using the user Id :)
//       },
//     });
//   } catch (e) {
//     res.status(500).json({ success: false, response: e.message });
//   }
// });








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


// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
