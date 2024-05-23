import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import expressListEndpoints from "express-list-endpoints";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";

dotenv.config();
const { Schema } = mongoose;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-authentication";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accessToken: { type: String, default: () => bcrypt.genSaltSync() },
});

const User = mongoose.model("User", userSchema);

const port = process.env.PORT || 8080;
const app = express();

const authUser = async (username, password, done) => {
  //Search the user, password in the DB to authenticate the user
  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done("error comparing passwords", false);
    }
  } catch (error) {
    return done("error logging in", false);
  }
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
// Middleware for initializing session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// init passport on every route call
app.use(passport.initialize());
// allow passport to use "express-session"
app.use(passport.session());
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Sign-up
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    console.log(user);

    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not sign up.", error: error.errors });
  }
});

// Log-in
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `http://localhost:5173/secrets`,
    failureRedirect: `http://localhost:5173/login`,
  })
);

// content page
app.get("/secrets", checkAuthenticated, (req, res) => {
  res.json({
    ID: req.user._id,
    name: req.user.username,
    AccessToken: req.user.accessToken,
  });
});

passport.use(new LocalStrategy(authUser));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
