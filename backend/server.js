import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const User = mongoose.model("User", {
  name: {
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello User!");
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.find({}).limit(10).sort().exec();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  if (password.length < 6) {
    res.status(400).json({
      success: false,
      response: "You need to have min 6 characters!",
    });
  } else {
    try {
      const newUser = await new User({
        name: name,
        password: bcrypt.hashSync(password),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          name: newUser.name,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        response: err,
      });
    }
  }
});

// Login
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          name: user.name,
          id: user.id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Could not login 😕 try again! ",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err,
    });
  }
});

const authenticatUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please try to login again.",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
};

const Thought = mongoose.model("Thought", {
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  hearts: {
    type: Number,
    default: 0,
  },
});

//Connected to frontend
// app.get("/thoughts", authenticatUser);
app.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find({}).limit(20).sort().exec();
    res.status(200).json({
      success: true,
      response: thoughts,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: err });
  }
});

// Post Thought
app.post("/thoughts", authenticatUser);
app.post("/thoughts", async (req, res) => {
  const { message } = req.body;
  try {
    const newThought = await new Thought({ message }).save();
    res.status(201).json({
      response: newThought,
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
