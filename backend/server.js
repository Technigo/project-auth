import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/codeAlong";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = Promise;
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", userSchema);

const authenticalUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization")
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ loggedout: true });
    }
  } catch (error) {
    res.status(400).json({ response: "error", success: false });
  }
};

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/secret", authenticalUser);
app.get("/secret", (req, res) => {
  res.send({ secret: "This is a secret" });
});

app.post("/singup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = new User({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    user.save();
    res.status(200).json({ id: user._id, accessToken: user.accessToken });
  } catch {
    res
      .status(400)
      .json({ message: "could not create user", errors: err.errors });
  }
});

app.post("/singin", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: { id: user._id, accessToken: user.accessToken },
        success: true
      });
    } else {
      res.status(400).json({ message: "no user found", success: false });
    }
  } catch {
    res.status(400).json({ message: "could not create user", success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
