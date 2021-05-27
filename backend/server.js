import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

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
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

//MIDDLEWARE FOR AUTHENTICATION
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid requset", error });
  }
};

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/mainpage", authenticateUser);
app.get("/mainpage", async (req, res) => {
  res.json({ message: 'Welcome!'})
});

// USER REGISTER

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.json({
      success: true,
      userID: newUser._id,
      user: newUser.username,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
});

// USER SIGNIN

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken,
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});