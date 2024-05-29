import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// here is the route for post sign up.
app.post("/signup", async (req, res) => {
  // here we are defining what kind of data we are going to get.
  User.create({ username: req.body.username, password: req.body.password })
    .then(() => {
      res.status(201).json({ token: "1234" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).json({ message: "Could not create user", error });
    });
});

// created a login endpoint here. POST/login is the endpoint. POST/sign up is also an endpoint. GET is also an endpoint. The endpoints like log in and user data gets stored in the database (mongoDB)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login with username: ${username} and password: ${password}`);
  // here we are creating a token ... like you get a ticket to a festival, and the wristband is the token
  return User.findOne({ username: req.body.username })
    .then((user) => {
      if (user && req.body.password === user.password) {
        console.log("User found", user);
        res.json({ token: "1234" });
      } else {
        console.log("User not found");
        res.status(401).json({ message: "Could not log in" });
        return
      }
    })
});

// here we are checking the token, if it is correct we get the message, if not we get a 401 error
app.get("/private", async (req, res) => {
  if (req.headers.authorization === "Bearer 1234") {
    res.json({ message: "This is a secret message" });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
