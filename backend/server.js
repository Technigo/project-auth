import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import crypto from "crypto"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

//MODEL 

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
//CHECKS IF THERE IS AN ACCESS TOKEN IF THERE IS WE CALL THE "NEXT" FUNC (LINE 49) OTHERWISE IT THROWS AN ERROR AND ASKS USER TO LOG IN
const userAuthentication = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization"),
    })
    if (user) {
      //EXPRESS FUNCTION
      next()
    } else {
      res.status(401).json({ response: "Please log in", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
// PATHS 
app.get("/secret", userAuthentication)
app.get("/secret", async (req, res) => {
  res.json({ response: main, success: true, message: "hush hush, secret :)" })
})
//GETS MODEL SCHEMA 
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body
  try {
    const salt = bcrypt.genSaltSync()//ENCRYPTS USER PASSWORD AND THROWS ERROR IF THERE IS LESS THAN 5 CHARACTERS
    if (password.length < 5) {
      throw "Password must be at least 5 characters"
    }
    const newUser = await new User({ // SAVES NEW USER INFO
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
  } catch (error) { //DIFFERENT TYPES OF ERRORMESSAGES DEPENDING ON THE CASE
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
    const user = await User.findOne({ username }) //CHECKS IF USER ALREADY HAS AN ACCOUNT
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
      if (username === "") { //DIFFERENT TYPES OF ERRORMESSAGES DEPENDING ON THE CASE
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
    res.status(400).json({ //DIFFERENT TYPES OF ERRORMESSAGES DEPENDING ON THE CASE
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
