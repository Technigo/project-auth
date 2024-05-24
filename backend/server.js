import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

dotenv.config();
const { Schema } = mongoose;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/project-authentication";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, minLength: 8 },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: { type: String, required: true },
  accessToken: { type: String, default: () => bcrypt.genSaltSync() },
});

const User = mongoose.model("User", userSchema);

const port = process.env.PORT || 8080;
const app = express();

// Function for authenticate by token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      Unauthorised: "You are not allowed to see our top secret message!",
    });
  }
};

// Add middlewares to enable cors and json body parsing
app.use(
  cors({
    origin: "https://team-peace-auth.netlify.app/",
    methods: ["GET", "POST"],
  }) // Allow sending credentials from frontend to backend
);
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
    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not sign up.", error: error.message });
  }
});

// Log-in
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ id: user._id, accessToken: user.accessToken });
    } else {
      res.status(401).json({
        message: "Invalid username or password.",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Could not login.", error: error.message });
  }
});

// secrets - Authentication method 2 - by Token
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.json({ secret: "This is a super secret message" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
