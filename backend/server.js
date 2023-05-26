import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"
import listEndpoints from "express-list-endpoints";

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
  res.send(listEndpoints(app));
});

// User schema
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
      message: "Registration successful",
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      response: err
    })
  }
})
// Log in 
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
        message: "Could not login, login details do not match"
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

// Thought schema
const ThoughtSchema = new Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140,
    // trim removes unnecessary white spaces from string
    trim: true
  },
  // hearts: {
  //   type: Number,
  //   default: 0
  // },
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
  // If we find the user's correct accessToken in the header "Authorization"
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

// Authenticated endpoint
// The authenticated endpoint should return a 401 or 403 (see 401 vs. 403 on SO) 
// with an error message if you try to access it without an Authentication access token 
// or with an invalid token.
// First we authenticate our user
app.get("/thoughts", authenticateUser)
// If they "pass" this is the function that happens next()
app.get("/thoughts", async (req, res) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      const thoughts = await Thought.find() // .populate('user') https://mongoosejs.com/docs/populate.html
      res.status(200).json({
        success: true,
        response: thoughts,
        message: "Thoughts found"
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Error, happy thoughts could not be found"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
  // Thoughts of the specific user
  // const thoughts = await Thought.find({user: user._id}) // .populate('user') https://mongoosejs.com/docs/populate.html
})


app.post("/thoughts", authenticateUser)
app.post("/thoughts", async (req, res) => {
  const { message } = req.body
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      const newThought = await new Thought({message: message, user: user._id}).save()
      res.status(201).json({
        success: true,
        response: newThought,
        message: "New thought message successfully posted"
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Error, message could not be posted"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
})

/////////////

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
