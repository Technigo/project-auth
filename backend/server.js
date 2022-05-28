import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8090;
const app = express();

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
        response: "Your password must be at least 8 characters long.",
        success: false
      })
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save()
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id
        },
        success: true
      })
    }

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

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        username: user.username,
        accessToken: user.accessToken,
        userId: user._id
      })
    } else {
      res.status(400).json({
        response: "Your username or password was incorrect, please check that you have the right login credentials!",
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

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({ accessToken: accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({
        response: 'please log in',
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}


app.get("/", (req, res) => {
  res.send("View frontend project here: !");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
