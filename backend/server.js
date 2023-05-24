// Importing necessary modules
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

// Creating a connection to the MongoDB database

// The `mongoUrl` variable stores the URL of the MongoDB database.
// It checks if the environment variable `MONGO_URL` is set, and if not, it uses a default local URL.
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";

// The `mongoose.connect` method establishes a connection to the MongoDB database using the specified URL.
// It takes two arguments: the `mongoUrl` and an object with options for the connection.
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// The `mongoose.Promise` property sets the default promise library for Mongoose to use.
// In this case, it sets it to the global Promise object.
mongoose.Promise = Promise;

// Setting up the Express application

// The `port` variable stores the value of the environment variable `PORT` or uses a default value of 8080.
const port = process.env.PORT || 8080;

// The `app` variable is initialized with the Express application.
// It represents our server that will handle incoming requests and send responses.
const app = express();

// Adding middlewares for enabling CORS and JSON body parsing

// The `app.use` method is used to add middleware functions to the Express application's middleware stack.
// The `cors` middleware allows Cross-Origin Resource Sharing, which enables requests from different origins.
app.use(cors());

// The `express.json` middleware is used to parse incoming JSON payloads.
// It adds a `body` property to the `request` object, containing the parsed JSON data.
app.use(express.json());

// Creating a route for the homepage

// The `app.get` method defines a route for handling GET requests to the root path ("/").
// When a GET request is made to "/", the provided callback function is executed.
// It takes two arguments: the `request` object representing the incoming request,
// and the `response` object used to send the response back to the client.
// In this case, the callback function sends the string "Hello Technigo!" as the response.
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Defining the User schema

// The `Schema` object is destructured from the `mongoose` module.
const { Schema } = mongoose;

// The `UserSchema` variable defines the structure of the User model.
// It is an instance of `mongoose.Schema` and represents a collection in the MongoDB database.
// It specifies the fields (username, password, accessToken) and their respective types and validation rules.
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
    // The accessToken field is of type String and has a default value
    // generated using the crypto.randomBytes function. 
    // It generates a random string of 128 bytes and converts it to a hexadecimal string.
  }
});

// Creating the User model

// The `User` variable is assigned the result of calling `mongoose.model`.
// It creates a model based on the `UserSchema` and associates it with the "User" collection in the MongoDB database.
const User = mongoose.model("User", UserSchema);


// Handling user registration

// The `app.post` method defines a route handler for handling POST requests to the "/register" endpoint.
// When a POST request is made to "/register", the provided callback function is executed.
// It takes two arguments: the `req` (request) object representing the incoming request,
// and the `res` (response) object used to send the response back to the client.
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // The req.body object contains the data sent in the request body. Destructuring is used to extract
  // the username and password values from the request body.
  try {
    // Inside a try block, the code generates a salt using bcrypt.genSaltSync()
    // for password hashing. The salt is a random value used to add complexity
    // to the password hash. So we basically generating a salt for password hashing
    const salt = bcrypt.genSaltSync();

    // Creating a new user using the provided username and a hashed password
    // The `bcrypt.hashSync` function is used to hash the password with the generated salt
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save();

    // Sending a success response with the registered user's information
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    });
  } catch (e) {
    // Sending an error response if the registration fails
    res.status(400).json({
      success: false,
      response: e
    });
  }
});


// Handling user login

// The `app.post` method defines a route handler for handling POST requests to the "/login" endpoint.
// When a POST request is made to "/login", the provided callback function is executed.
// It takes two arguments: the `req` (request) object representing the incoming request,
// and the `res` (response) object used to send the response back to the client.
app.post("https://project-auth.onrender.com/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Finding the user with the provided username
    // Inside a try block, the code attempts to find the user 
    // with the provided username using the User.findOne method.
    const user = await User.findOne({ username: username });

    // The code checks if the user exists and if the password matches using bcrypt.compareSync.
    // This function compares the provided password with the stored hashed password of the user.
    if (user && bcrypt.compareSync(password, user.password)) {
      // If the user exists and the password matches, a success response is sent
      // with the user's information, including the username, id, and accessToken.
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      // If the user does not exist or the credentials do not match,
      // an error response is sent with the message "Credentials do not match".
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      });
    }
  } catch (e) {
    // If any unexpected error occurs during the login process, 
    // an error response with a status code of 500 (Internal Server Error) is sent,
    // along with the error message.
    res.status(500).json({
      success: false,
      response: e
    });
  }
});


// Defining the Thought schema

// The `ThoughtSchema` variable defines the structure of the Thought model.
// It is an instance of `mongoose.Schema` and represents a collection in the MongoDB database.
// It specifies the fields (message, createdAt, hearts, user) and their respective types and default values.
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

// Creating the Thought model

// The `Thought` variable is assigned the result of calling `mongoose.model`.
// It creates a model based on the `ThoughtSchema` and associates it with the "Thought" collection in the MongoDB database.
const Thought = mongoose.model("Thought", ThoughtSchema);

// Middleware to authenticate the user

// The `authenticateUser` middleware function is defined to authenticate the user before accessing protected routes.
// It takes three arguments: the `req` (request) object representing the incoming request,
// the `res` (response) object used to send the response back to the client,
// and the `next` function to pass control to the next middleware function.
const authenticateUser = async (req, res, next) => {
  // Extracting the access token from the request headers
  const accessToken = req.header("Authorization");

  try {
    // Finding the user with the provided access token
    const user = await User.findOne({ accessToken: accessToken });

    if (user) {
      // If the user exists, proceed to the next middleware function
      next();
    } else {
      // If the user does not exist, send a 401 Unauthorized response
      res.status(401).json({
        success: false,
        response: "Please log in"
      });
    }
  } catch (e) {
    // If an unexpected error occurs, send a 500 Internal Server Error response
    res.status(500).json({
      success: false,
      response: e
    });
  }
};

// Handling GET requests for fetching thoughts

// The `app.get` method defines a route handler for handling GET requests to the "/thoughts" endpoint.
// The `authenticateUser` middleware function is used to authenticate the user before accessing the route.
// When a GET request is made to "/thoughts", the provided callback function is executed.
// It retrieves all thoughts from the database using `Thought.find`, and sends a success response with the thoughts.
app.get("https://project-auth.onrender.com/thoughts", authenticateUser);
app.get("https://project-auth.onrender.com/thoughts", async (req, res) => {
  const accessToken = req.header("Authorization");
  const user = await User.findOne({ accessToken: accessToken });
  // Thiss will only happne if the next() function is called from the middleware
  // now we can access the req.user object from the middleware
  const thoughts = await Thought.find({});
  res.status(200).json({ success: true, response: thoughts });
});

// Handling POST requests for creating thoughts

// The `app.post` method defines a route handler for handling POST requests to the "/thoughts" endpoint.
// The `authenticateUser` middleware function is used to authenticate the user before accessing the route.
// When a POST request is made to "/thoughts", the provided callback function is executed.
// It retrieves the thought message from the request body and the user's access token from the request headers.
// It finds the user using the access token, creates a new thought with the message and user ID,
// saves it to the database using `Thought.save`, and sends a success response with the created thought.
app.post("https://project-auth.onrender.com/thoughts", authenticateUser);
app.post("https://project-auth.onrender.com/thoughts", async (req, res) => {
  const { message } = req.body;
  const accessToken = req.header("Authorization");
  const user = await User.findOne({ accessToken: accessToken });
  const thoughts = await new Thought({ message: message, user: user._id }).save();
  res.status(200).json({ success: true, response: thoughts });
});

// Start the server

// The `app.listen` method starts the server and listens for incoming requests on the specified port.
// When the server starts running, it logs a message indicating the server's URL and port.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
