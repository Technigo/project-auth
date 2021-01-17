import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import endpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

const User = mongoose.model("User", userSchema);

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(endpoints(app));
});

//registration endpoint
//This endpoint registers a new user. It consists of a deconstructed body
//using name and password. We added a variable called salt
//to ensure that the password is hashed properly
//and reduces the possibility for rainbow tables (backward hashing to figure out password)
//we should never store the password in plain text or return the password to the client.

//When trying to add a user with a non unique username, the errormessage is vague
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await new User({
      username,
      password,
    }).save();
    console.log("UserID:", user._id);
    console.log("AccessToken:", user.accessToken);
    res.status(201).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: "Could not create user", error: err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.get("/secrets", authenticateUser);
app.get("/secrets", async (req, res) => {
  try {
    const secretMessage = `This is a super secret message for ${req.user.username}`;
    res.status(201).json({ secretMessage });
  } catch (err) {
    res.status(401).json({ notFound: true, error: err });
  }
});

app.post("/sessions", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        Login: "success",
        userId: user._id,
        accessToken: user.accessToken,
      });
    } else {
      throw "User not found";
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
