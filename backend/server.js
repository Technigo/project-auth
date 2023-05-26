import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const welcomeMessage = "Project Authentication API";
  const endpoints = listEndpoints(app);

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      welcomeMessage,
      endpoints
    }
  });
});

const { Schema } = mongoose;
// userSchema
const UserSchema = new mongoose.Schema({
  username: {
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
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const User = mongoose.model('User', UserSchema);

// Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,32}$/;
    // This regular expression ensures:
    // At least one digit: (?=.*\d)
    // At least one lowercase letter: (?=.*[a-z])
    // At least one uppercase letter: (?=.*[A-Z])
    // At least one special character: (?=.*[!@#\$%\^&\*])
    // A total length of between 8 and 32 characters: .{8,32}

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      response: {
        message: "Password needs to be between 8 and 32 characters, and include at least one number, one uppercase letter, one lowercase letter, and one special character."
      }
    })
  }

  try {

    const existingUserName = await User.findOne({ username: username});
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        response: {
          message: "Username is already taken"
        }
      })
    }

    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken,
        message: "User successfully created"
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
          message: "You're logged in"
        }
      })
    } else {
      res.status(404).json({
        success: false,
        response: {
          message: "Invalid credentials",
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    })
  }
});

// Authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({accessToken});
    if (user) {
      next();
    } else {
      res.status(400).json({
        success: false,
        response: {
          message: "You're not logged in",
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
}

// Secret endpoints
app.get("/secrets", authenticateUser);
app.get("/secrets", async (req, res) => {
  res.status(200).json({
    success: true,
    response: {
      secret: 'Here we will show super secret stuff'
      // add secrets
    }
  })
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
