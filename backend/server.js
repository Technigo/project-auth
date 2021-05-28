import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt, { genSaltSync } from "bcrypt";

// Theare are env varaibles that are passed in when the backend server runs. This way we don't store the database username or password
const userDB = process.env.userDB;
const passDB = process.env.passDB;

// Local host url
// mongodb://localhost/authAPI

const mongoUrl =
  process.env.MONGO_URL ||
  `mongodb+srv://${userDB}:${passDB}@cluster0.gexln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Thought = mongoose.model("Thought", {
  message: String,
});

// This function will check if the user is logged in before the user is allowed to perform actions on the website. This middleware will always be checked before any endpoint.
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });

    if (user) {
      next();
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
};

// This is our user model for the database. It's the same for every user that is registered.
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
// app.use(authenticateUser);

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// This is a GET endpoint that will return all the thougut that are available in the database and if there are no thoughts the API will throw and error
app.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(400).json({ message: "Could not fetch thoughts", error });
  }
});

// This is a POST endpoint and it will allow the used to submit a new thought that will be stored in the database. The post request takes a message in the json body.
app.post("/thoughts", async (req, res) => {
  const { message } = req.body;

  try {
    const newThought = await new Thought({ message }).save();
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
});

// This is a POST endpoint that will allow users to sign up to the website. The post request takes a username and password in the json body.
// The backend will encrypt the users password for securit and well as generating a personal accessToken for the account
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt),
      email: email,
    }).save();

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
});

// This is a POST endpoint that will allow a user to log in to the website. The endpoint takes a username and password in the json body.
// IF the username and the encpyted password match what's in the databse then the user is logged in and an accessToken is passed back to the user via tha API.
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
