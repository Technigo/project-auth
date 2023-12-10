import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


// A model for users 4 fields: name, email, password, accessToken

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (existingUser) {
      throw new Error("User already exists");
    } else {
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
    }
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.errors });
  }
}
);


const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
}

app.get("/secrets", authenticateUser);

app.get("/secrets", (req, res) => {
  res.json({secret: "This is a super secret message"});
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
