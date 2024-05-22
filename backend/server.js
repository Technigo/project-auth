import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
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
    default: () => bcrypt.genSaltSync(),
  },
});

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Registration endpoint
app.post("/users", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    res.status(400).json({
      response: error.message,
      success: false,
      message: "Could not create user",
      errors: error.errors,
    });
  }
});

// Sign-in endpoint

// Endpoint once user is signed in

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
