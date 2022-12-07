import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import getEndpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise = Promise;

/* ------Schemas------ */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(23).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

/* ----- Authentication -------- */

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();  // when user is confirmed call the next function on line 120 after authentication
    } else {
      res.status(401).json({ response: 'Please log in', success: false });
    }
  } catch (error) {
    res.status(500).json({ response: error, success: false });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// List of endpoints
app.get('/', (req, res) => {
  res.send(getEndpoints(app));
});

/* ------ Registration endpoint used in registration form in FE ------ */

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const usernameExists = await User.findOne({ username });

    if (password.length < 8) {
      res.status(400).json({
        response: "Password should be at least 8 characters long",
        success: false,
      });
    } else if (usernameExists) {
      res.status(400).json({
        response: "username already in use",
        success: false,
      });
    } else {
      const newUser = await new User({ username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});


/* ------ Login endpoint used in login form in FE ------ */

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(201).json({
        success: true,
        response: {
          userId: user._id, 
          username: user.username,
          accessToken: user.accessToken} //secured password encrypted as a AccessToken to prevent data steal
        })
    } else {
      res.status(400).json({
        success: false,
        response: 'Credentials did not match'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    })
  }
})

/* ------ Content endpoint used in component with "secret message" in FE ------ */

app.get("/secretContent", authenticateUser);  // If authentication === true ==> fetch will use next() from line 40
                                       // if ath === false the secret content will not be displayed
app.get("/secretContent", async (req, res) => { 
  const secretMessage = 'You are awesome!'
  try {
    res.status(200).json({
      success: true,
      secretMessage,
    })
  } catch (error) {
    res.status(401).json({
      errors: error,
      response: 'Failed to display the secret content.',
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
