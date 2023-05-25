import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 14
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", userSchema);

const userPostSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: String,
    require: true
  }
})

const UserPost = mongoose.model("UserPost", userPostSchema);

// Authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    });
  }
}

// Registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
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
        accessToken: newUser.accessToken
      }
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e
    })
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      })
    } else {
      res.status(401).json({
        success: false,
        response: "Credentials do not match"
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    })
  }
})

// Start defining your routes here
app.get("/surfposts", authenticateUser);
app.get("/surfposts", async (req, res) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    const surferposts = await UserPost.find({ user: user._id });
    if (surferposts.length) {
      res.status(200).json({
        success: true,
        response: surferposts
      })
    } else {
      res.status(404).json({
        success: true,
        response: "No posts found from this creator"
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    })
  }
});

app.post("/surfposts", authenticateUser);
app.post("/surfposts", async (req, res) => {
  const { headline, message, location, } = req.body;
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    const surferposts = await new UserPost({ headline: headline, message: message, location: location, user: user._id }).save();
    if (surferposts) {
      res.status(201).json({
        success: true,
        response: surferposts
      })
    } else {
      res.status(400).json({
        success: false,
        response: ""
      })
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
