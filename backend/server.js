import cors from "cors";
import crypto from "crypto";
import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import expressListEndpoints from "express-list-endpoints";

// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
const mongoUrl = "mongodb://localhost/auth";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

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

/// Documentation endpoints
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  const documentation = {
    Welcome: "This is the Authentication API!",
    Endpoints: {
      "/": "Get API documentation",
      "/users": {
        POST: "Create a new user",
      },
      "/sessions": {
        POST: "Authenticate a returning user",
      },
      "/secrets": {
        GET: "Get secret content (requires authentication)",
      },
    },
  };
  res.json(documentation);
});

//midleware function
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=8080 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  const documentation = {
    Welcome: "This is the Authentication API!",
    Endpoints: {
      "/": "Get API documentation",
      "/users": {
        POST: "Create a new user",
      },
      "/sessions": {
        POST: "Authenticate a returning user",
      },
      "/secrets": {
        GET: "Get secret content (requires authentication)",
      },
    },
  };
  res.json(documentation);
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //DO NOT STORE PLAINTEXT PASSWORD
    const salt = bcrypt.genSaltSync();
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).json({
      success: true,
      message: "User created",
      id: user._id,
      accessToken: user.accessToken
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Could not create user", errors: error });
  }
});


app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({
      success: true,
      message: "User authenticated",
      id: user._id,
      accessToken: user.accessToken
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({ secret: "This is a super secret!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
