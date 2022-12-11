import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt"

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

// Schema for User, with encryptet password
const UserSchema = new mongoose.Schema({
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
type: String,
default: () => crypto.randomBytes(128).toString("hex")
}
});

const User = mongoose.model("User", UserSchema);

// Registers a new user and requires password to be over 8 characters and encrypts password
app.post("/register", async (req, res) => {
const { username, password } = req.body;
try {
  const salt = bcrypt.genSaltSync();
  if(password.length < 8) {
    response.status(400).json({
      success: false,
      response: "password must be at least 8 characters long"
    })
  } else {
    const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        accessToken: newUser.accessToken,
        id: newUser._id
      }
    })
  }
} catch(error) {
res.status(400).json({
  success: false,
  response: error,
})
}
});

// Matches username and accesstoken when logging , otherwise throws error 
app.post("/login", async (req, res) => {
const { username, password } = req.body;
try {
  const user = await User.findOne({username});
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      success:true,
      response: {
        username: user.username,
        id: user._id,
        accessToken: user.accessToken
      }
    });
  } else {
    res.status(400).json({
      success: false,
      response: "credentials didn't match"
    })
  }
} catch(error) {
  res.status(500).json({
    success: false,
    response: error

  })
}
});

//Checks if user has access token, if not throws error
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if(user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "please log in"
      })
    }

  } catch(error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});