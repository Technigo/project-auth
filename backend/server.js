import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import bcrypt from "bcrypt"

import User from './models/users'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())



const authenticator = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization")
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({
        loggedOut: true,
        message: "Try again.."
      })
    }
  } catch (err) {
    res.status(403).json({
      message: "access token missing or wrong",
      errors: err.errors
    })
  }
}




// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})







//make a user -- google creating a signup flow for gmail
app.post("/users", async (req, res) => {
  try {
    const {
      name,
      password
    } = req.body
    const user = new User({
      name,
      password: bcrypt.hashSync(password)
    })
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({
      message: "could not save user",
      errors: err.errors
    })
  }
})
// log in
app.post("/sessions", async (req, res) => {
  try {
    const {
      name,
      password
    } = req.body
    const user = await User.findOne({
      name
    })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        userId: user._id,
        accessToken: user.accessToken
      })
    } else {
      res.json({
        notFound: true
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "could not log in user",
      error: err.errors
    })
  }
})
// secure endpoint after log in
app.get("/users/:id", authenticator)
app.get("/users/:id", (req, res) => {
  try {
    res.status(201).json(req.user)
  } catch (err) {
    res.status(400).json({
      message: "could not save user",
      errors: err.errors
    })
  }
})








// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
