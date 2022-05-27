import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import ufoSightings from "./data/sightings.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

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
  res.send("Frontend: https://haveyouseenmebro.netlify.app/");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    //
    if (password.length < 8) {
      res.status(400).json({
        response: "Password must contain at least 8 characters long",
        success: false,
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id,
        },
        success: true,
      });
    }
    //
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        response: "Username is already taken. Please enter new username.",
        success: false,
      });
    } else {
      console.log(error);
      res.status(400).json({
        response: error,
        success: false,
      });
    }
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          accessToken: user.accessToken,
          userId: user._id,
        },
      });
    } else {
      res.status(400).json({
        response: "Username and password don't match.",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

app.get("/sighting", authenticateUser);
app.get("/sighting", (req, res) => {
  const sighting = ufoSightings[Math.floor(Math.random() * 80331)];

  if (sighting) {
    res.status(200).json({ success: true, response: sighting });
  } else {
    res.status(400).json({
      response: "You in danger.",
      success: false,
    });
  }
});

console.log(ufoSightings[Math.floor(Math.random() * 80331)]);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
