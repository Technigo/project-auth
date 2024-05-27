import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import expressListEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"), //user gets a string of random numbers as the accessToken
  },
});

//a middleware function for looking for the user based on the accessToken saved in "Authorization" in the header
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  const documentation = endpoints.map((endpoint) => ({
    method: endpoint.methods.join(", "),
    path: endpoint.path,
  }));
  res.json(documentation);
});

app.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //error handling
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Please enter username" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Please enter email" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Please enter password" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const salt = bcrypt.genSaltSync();
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create the user", errors: err.errors });
  }
});

app.get("/dashboard", authenticateUser);
app.get("/dashboard", (req, res) => {
  res.json({ message: "You're logged in!" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      userId: user._id,
      name: user.name,
      accrssToken: user.accessToken,
    });
  } else {
    return res.status(400).json({ notFound: true });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
