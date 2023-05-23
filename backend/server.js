import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//////////////

// const UserSchema = new mongoose.Schema 

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    // npm install crypto
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = mongoose.model("User", UserSchema)

// Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync() // Obscuring our password
    const newUser = await new User ({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    })
  }
})
// Login/ Sign in
app.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({username: username})
    // const user = await User.findOne({username})
    // Comparing the password with the password filled in
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        } 
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
})
////

// Thoughts
const ThoughtSchema = new Schema({
  message: {
    // type is the most important one
    type: String,
    // required will be true or false, strongly recommended to use
    required: true,
    minlength: 5,
    maxlength: 140,
    // trim removes unnecessary white spaces from string
    trim: true
  },
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  // New part of the schema
  user: {
    type: String,
    required: true
  }
})

const Thought = mongoose.model("Thought", ThoughtSchema)

// Authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  // if we find the accessToken
  try {
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      // Calling the next function says that all of the stuff that we get from the req/res, will be transferred to the next function with the same endpoint
      next()
    } else {
    res.status(401).json({
      success: false,
      response: "Please log in"
    });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
}

// First we authenticate our user
app.get("/thoughts", authenticateUser)
// If they "pass" this is the function that happens next()
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({})
  res.status(200).json({success: true, response: thoughts})
  // add if else block
})

app.post("/thoughts", authenticateUser)
app.post("/thoughts", async (req, res) => {
  const { message } = req.body
  const accessToken = req.header("Authorization")
  const user = await User.findOne({accessToken: accessToken})
  const thoughts = await new Thought({message: message, user: user._id}).save()
  res.status(200).json({success: true, response: thoughts})
  // add if else block
})

/////////////

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
