import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  },
  favoriteFood: {
    type: String,
    default: ""
  },
  favoriteMovie: {
    type: String,
    default: ""
  },
  favoriteBook: {
    type: String,
    default: ""
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true, message: "Please log in to view this content" })
  }
}

// Defines the port the app will run on
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining the routes here
app.get('/', (req, res) => {
  res.send('Authentication API')
})

//Registration
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, favoriteFood, favoriteMovie, favoriteBook } = req.body
    //bcrypt because we should not store plain text passwords
    const user = new User({
      name, email, favoriteFood, favoriteMovie, favoriteBook,
      password: bcrypt.hashSync(password)
    })
    const saved = await user.save()
    res.status(201).json({ saved, message: "Registration succeeded" })
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.errors })
  }
})

//Content update
app.put("/users/userId", async (req, res) => {
  const { id } = req.params
  try {
    await User.updateOne({ 'userId': user._id }, req.body, { accessToken: req.header("Authorization") })
    console.log(userId)
    res.status(201).json()
  } catch (err) {
    res.status(400).json({ message: "Could not save update", errors: err.errors })
  }
})

//Log in
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.password)) {
    //Success
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    //Failure because user doesn't exist or encrypted password doesn't match
    res.status(400).json({ notFound: true })
  }
}
)

app.get("/content", authenticateUser)
//This will only be shown if the next()-function is called from the middleware
app.get("/content", (req, res) => {
  res.json({ message: "😎 This is a secret message 😎" })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
