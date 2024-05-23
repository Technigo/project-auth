import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import crypto from "crypto"
import bcrypt from "bcryptjs"

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Authorization"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
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
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header("Authorization"),
  }).exec()
  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Access token missing." })
  }
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
const cors = require("cors")

// Enable CORS middleware
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// Start defining your routes here
app.get("/", (req, res) => {})
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ name }).exec()
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" })
    }
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: "Could not save user", errors: err.errors })
  }
})
app.get("/secrets", authenticateUser)
app.get("/secrets", (req, res) => {
  res.send(" This is the secret page to show after logging or registration.")
})
app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec()
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    res.json({ notFound: true })
  }
})
app.post("/logout", async (req, res) => {
  try {
    const accessToken = req.header("Authorization")

    // Find the user by the access token and update the accessToken field to invalidate it
    const user = await User.findOneAndUpdate(
      { accessToken },
      { accessToken: null }
    ).exec()

    if (user) {
      res.status(200).json({ message: "Logout successful" })
    } else {
      res.status(401).json({ message: "Unauthorized" })
    }
  } catch (error) {
    console.error("Error logging out:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
