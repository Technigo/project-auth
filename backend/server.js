import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

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
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const User = mongoose.model("User", UserSchema)

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 8) {
      res.status(400).json({
        response: "password must be at least 8 characters long",
        success: false
    })
  }

    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.status(201).json({
      response: {
        username: newUser.username,
        accesToken: newUser.accessToken, 
        userID: newUser._id
      },
      success: true
    })
  } catch (error) {
      res.status(400).json({
      response: error,
      success: false
    })
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  
  try {
    const user = await User.findOne({ username })

    if(user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true, 
        username: user.username,
        accessToken: user.accessToken,
        userId: user._id
      })
    } else {
      res.status(400).json({
        response: "username and password don't match",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
    response: error,
    success: false
  })
}
})

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
