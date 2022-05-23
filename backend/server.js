import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import crypto from "crypto"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
})

const User = mongoose.model("User", userSchema)

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
const userAuthentication = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization"),
    })
    if (user) {
      next()
    } else {
      res.status(401).json({ response: "Please log in", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
// paths
app.get("/secret", userAuthentication)
app.get("/secret", async (req, res) => {
  res.json({ response: main, success: true, message: "hush hush, secret :)" })
})

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 5) {
      throw "Password must be at least 5 characters"
    }

    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        email: newUser.email,
      },
      success: true,
    })
  } catch (error) {
    if (username === "") {
      res.status(400).json({
        message: "wrong username",
        response: error,
        success: false,
      })
    } else if (error.code === 11000 && error.keyPattern.username) {
      res.status(400).json({
        message: "username taken",
        response: error,
        success: false,
      })
    } else if (password === "") {
      res.status(400).json({
        message: "password missing/incorrect",
        response: error,
        success: false,
      })
    } else {
      res.status(400).json({
        message: "username and password missing",
        response: error,
        success: false,
      })
    }
  }
})

app.post("/signin", async (req, res) => {
  const { username, password, email } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      if (username === "") {
        res.status(404).json({
          message: "missing username",
          response: "missing username",
          success: false,
        })
      } else if (password === "") {
        res.status(404).json({
          message: "missing password",
          response: "missing password",
          success: false,
        })
      } else {
        res.status(404).json({
          message: "wrong username or password",
          response: "wrong username or password",
          success: false,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "wrong entry",
      response: error,
      success: false,
    })
  }
})

app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
