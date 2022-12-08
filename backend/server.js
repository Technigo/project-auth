import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.find({}).limit(10).sort().exec();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

// app.post('/newUser', async (req, res) => {
//   const {name, password} = req.body;
//   const user = new User({name, password: bcrypt.hashSync(password)})
//   try{
//     const savedNewUser= await user.save();
//     res.status(201).json({response: savedNewUser, success: true});
//   }
//   catch (err){
//     res.status(400).json({
//       message: "Coould not save new user",
//       error: err.error,
//       success: false
//     })

//   }
// })

app.post("/registerUser", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        response: "You need to have min 6 characters!",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync,
      }).save();
      res.status(201),
        json({
          success: true,
          response: {
            username: newUser.username,
            accessToken: newUser.accessToken,
            id: newUser._id,
          },
        });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.name,
          id: user.id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "You do not have authorization",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err.error,
    });
  }
});

const authenticatedUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please try to login again ",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
};

const Thought = mongoose.model("Thought", {
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  header: {
    type: Number,
    default: 0,
  },
});

// Get Post
app.get("/thoughts", authenticatedUser);
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({});
  res.status(200).json({
    success: true,
    response: thoughts,
  });
});

// Post Thought
app.post("/thought", authenticatedUser);
app.post("/thought", async (req, res) => {
  const { message } = req.body;
  try {
    const newThought = await new Thought({ message: message }).save();
    res.status(201).json({
      response: newThought,
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
