import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressListEndpoints from "express-list-endpoints";
import bcrypt from "bcrypt";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

//create schema
const userSchema = new mongoose.Schema({
  name: {
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
    default: () => bcrypt.genSaltSync(),
  },
});

//create model
const User = mongoose.model("User", userSchema);

// console.log(bcrypt.genSaltSync());

//defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

//add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//middleware to check if database is available
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "service unavailable" });
  }
});

//middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401),
      json({ loggedOut: true, message: "you have to log in to get access" });
  }
};

//registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      accessToken: bcrypt.genSaltSync(), //generate a new token
    });

    await newUser.save();
    res.status(201).json({ id: newUser._id, accessToken: newUser.accessToken });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: error.errors });
  }
});

//login endpoint
app.post("/login", async (req, res) => {
  //find user by name
  const user = await User.findOne({ name: req.body.name });
  //check if password is correct
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(401).json({ message: "user name or password invalid" });
  }
});

//authenticated endpoint
app.get("/dashboard", authenticateUser, (req, res) => {
  res.json({ message: "This is the secret dashboard!", user: req.user });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //success
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    //failure
    // A) user doesn not exist
    // B) encrypted password does not match
    res.json({ notFound: true });
  }
});

//route to list all endpoints
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
