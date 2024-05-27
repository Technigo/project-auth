import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import User from "./models/User"
import dotenv from "dotenv"
import expressListEndpoints from "express-list-endpoints"

//Dot env
dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. 
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

//Middleware to authenticate user with accesstoken
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") })
  if (user) {
    req.user = user
    next()
  } else {
    res
      .status(401)
      .json({
        loggedOut: true,
        message: "You have to log in to view this page",
      })
  }
}

// Route handler
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})

//Sign up endpoint
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    })
    await user.save()
    res.status(201).json({
      id: user._id,
      accessToken: user.accessToken,
      success: true,
      response: user,
      message: "You are now signed up",
    })
  } catch (err) {
    res.status(400).json({
      message: "Could not create user",
      response: err,
      success: false,
    })
  }
})

app.get("/loggedin", authenticateUser)
app.get("/loggedin", (req, res) => {
  res.json({
    loggedin: "You are logged in and can view this secret message :)",
  })
})

app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        success: true,
        userId: user._id,
        accessToken: user.accessToken,
        message: "You are successfully logged in",
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Email or password is incorrect, please try again",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error signing in, please try again",
      error: error.message,
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
