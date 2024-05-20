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

//create a schema
const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  // },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
});

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

//routes
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
// });

app.post("/dashboard", authenticateUser);
app.post("/dashboard", async (req, res) => {
  //this will only happen if the next() function is called from the middleware
  //now we can access the req.user object from the middleware
});

app.post("/sessions", async (req, res) => {
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

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
