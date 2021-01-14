import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const listEndpoints = require("express-list-endpoints");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res
      .status(401)
      .json({ loggedOut: true, message: "You are not authorized" });
  }
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync();
  console.log(`Password before hash ${user.password}`);
  user.password = bcrypt.hashSync(user.password, salt);
  console.log(`Password after hash ${user.password}`);
  next();
});

const User = mongoose.model("User", userSchema);

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.post("/users", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { name, password } = req.body;
    const user = await new User({
      name,
      password,
    }).save();
    res.status(200).json({
      userId: user._id,
      accessToken: user.accessToken,
      message: "Signed up",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
      message: "Could not save user",
    });
  }
});

app.post("/sessions", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name: name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        userId: user._id,
        accessToken: user.accessToken,
        message: "Logged in",
      });
      //next?
    } else {
      res.status(400).json("Username or password not found");
    }
  } catch (err) {
    res.status(404).json({
      error: err,
      message: "Username or password not found",
    });
  }
});

app.get("/authentication", authenticateUser);
app.get("/authentication", async (req, res) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });

  res.status(200).json({
    name: user.name,
    message: `Congrats ${user.name} you are authorized!!`,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
