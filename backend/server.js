import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
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

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

//logout
// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorization") });
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.status(401).json({ loggedOut: true });
//   }
// };

// Start defining your routes here

// app.get("/", (req, res) => {
// res.send("Hello world");
// });

// Sign-up
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// app.get("/secrets", authenticateUser);
// app.get("/secrets", (req, res) => {
//   res.json({ secret: "This is a supersecret message" });
// });

// login user
app.post("/sessions", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      throw "User not found";
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// Get user specific information
app.get("/users/:id", async (req, res) => {
  res.status(501).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
