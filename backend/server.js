import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const Thoughts = mongoose.model("Thoughts", {
  message: String,
});

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlenght: 15,
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
    // maxlenght: 15,
    //   validate: {
    //     validator: (value) => {
    //       return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    //     },
    //     message: 'Password needs to contain at least one letter and one number'
    // },
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({  success: false, message: "Not authorized" });
    }
  } catch (error) {
    res.status(400).json({  success: false, message: "Invalid request", error });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/thoughts", authenticateUser);
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thoughts.find();
  res.json({ success: true, thoughts });
});

// app.post("/thoughts", authenticateUser);
// app.post("/thoughts", async (req, res) => {
//   const { message } = req.body;
//   try {
//     const newThought = await new Thoughts({ message }).save();
//     res.json(newThought);
//   } catch (error) {
//     res.status(400).json({ message: "Invalid request", error });
//   }
// });

// Post request for signing up
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
});

// Post request for signing in
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
