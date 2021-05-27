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

const UserMessage = mongoose.model("UserMessage", {
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: [true, "You need to enter a name"],
    minlength: [1, 'Your name needs to be min 1 character'],
    maxlength: [15, 'Your name can be max 15 characters']
  },
  username: {
    type: String,
    required: [true, 'You need to enter a username'],
    unique: [true, 'Username is already taken'],
    minlength: [5, 'Your username needs to be min 5 characters'],
    maxlength: [15, 'Your username can be max 15 characters'],
  },
  email: {
    type: String,
    required: [true, 'You need to enter an email'],
    unique: [true, 'There is already an user with that email'],
    trim: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'Please, enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'You need to choose a password'],
    minlength: [8, 'Your password needs to contain min 8 characters'],
    // maxlength: [15, 'Your password can be max 15 characters']
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
    const userMessage = await UserMessage.findOne({ accessToken });
    if (user) {
      next();
    } else if(userMessage) {
      next();
    } else {
      res.status(401).json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error });
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

app.get("/joke", authenticateUser);


app.get("/usermessage", authenticateUser);
app.get("/usermessage", async (req, res) => {
  const userMessage = await UserMessage.find().sort({ createdAt: -1 }).limit(1);
  res.json({ success: true, userMessage });
});

app.post('/usermessage', authenticateUser);
app.post('/usermessage', async (req, res) => {
  const { message } = req.body;

  try {
    const newUserMessage = await new UserMessage({ message }).save();
    res.json({ success: true, newUserMessage});
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});

// Post request for signing up
app.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.json({
      success: true,
      name: newUser.name,
      userID: newUser._id,
      username: newUser.username,
      email: newUser.email,
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
