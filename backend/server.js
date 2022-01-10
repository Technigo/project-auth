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

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  mail: {
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
      res.status(401).json({ response: "Please, log in", success: false });
    }
  } catch {
    res.status(401).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to this API");
});

app.post("/signup", async (req, res) => {
  const { mail, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "Password need to be 5 characters or longer";
    }

    const user = new User({
      mail,
      password: bcrypt.hashSync(password, salt)
    });
    user.save();
    res.status(201).json({
      response: { id: user._id, accessToken: user.accessToken },
      success: true
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get("/secret", authenticalUser);
app.get("/secret", (req, res) => {
  res.send({ secret: "This is secret" });
});

app.post("/signin", async (req, res) => {
  const { mail } = req.body;
  try {
    const user = await User.findOne({ mail });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ id: user._id, accessToken: user.accessToken });
    } else {
      res.json({
        message: "Mailadress or password doesn't match",
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
