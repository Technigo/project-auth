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
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") })
  if (user) {
    req.user = user
    next()
  } else {
    //Ska detta va 401 eller 403? 403 verkar vara permanent förbjuden
    res.status(401).json({ loggedOut: true, message: "Please log in to view this content" })
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//Registration
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body
    //bcrypt because we should not store plain text passwords
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.errors })
  }
})

//Log in
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //Success
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    //Failure because user doesn't exist or encrypted password doesn't match
    res.json({ notFound: true })
  }
}
)

app.get("/content", authenticateUser)
//This will only be shown if the next()-function is called from the middleware
app.get("/content", (req, res) => {
  res.json({ content: "You're logged in" })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
