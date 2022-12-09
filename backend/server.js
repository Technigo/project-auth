import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
/////// Tuesday
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    /// My_B4nK_P4$$word
  },
  // npm install crypto
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // npm install bcrypt
  // const code = [1, 2, 4, 4];
  // const makeCodeSecret = (codeArr) => {
  // const secretMessage = codeArr.map(singleNumber => singleNumber + 1);
  // return secretMessage
  //}
  // transformedCode = makeCodeSecret(code)
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
});

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

const GreetingSchema = new mongoose.Schema({
  receiver: {
    type: String,
    maxlength: 30,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140,
    trim: true,
  },
  sender: {
    type: String,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Greeting = mongoose.model("Greeting", GreetingSchema);

app.get("/greetings", authenticateUser);
app.get("/greetings", async (req, res) => {
  const greetings = await Greeting.find().sort({createdAt: 'desc'}).limit(18).exec();
  res.status(200).json({ success: true, response: greetings });
});

app.post("/greetings", authenticateUser);
app.post("/greetings", async (req, res) => {
  const { receiver, message } = req.body;
  try {
    const newGreeting = await new Greeting({ receiver, message }).save();
    res.status(201).json({ success: true, response: newGreeting });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

///////
// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
