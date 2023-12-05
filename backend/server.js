import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

//connect to database
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//----- The User model -------//
const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
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

//One-way encryption
//const user = new User({ name: "Bob", password: bcrypt.hashSync("foobar") });
//user.save();

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

//------- MIDDLEWARE --------//

//access tokens in code/middleware
//middleware function that looks up the user based on the access token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorisation") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//-----Routes------//

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

//registration endpoint, assigns a name, email and password into the database
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //DO NOT STORE PLAINTEXT PASSWORDS
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

//a secret endpoint that right now returns a message. but this is protected by authenticateUser, it needs to be validated before the user can access this message.
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({ secret: "This is a super secret message" });
});

//login endpoint called session which does nearly the same thing as the registration endpoint but it does not create the user, it finds one!
app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //authentification successful
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    //failed a. user doesn't exist or b. encrypted pw does not match
    res.json({ notFound: true });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
