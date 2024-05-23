import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../model/User.js"
import authenticateUser from "../middleware/authenticateUser.js"
import Thought from "../model/Thought.js"

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = new User({ username, password: password })
    await user.save()
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

authRouter.get("/signup", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(username)
    console.log(password)
    const user = await User.findOne({ username })
    console.log(user)
    console.log("Inkommande lösenord:", password)
    console.log("Hashat lösenord i databasen:", user.password)
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    console.log("Genererat JWT-token:", token)
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

authRouter.get("/thoughts", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id
    const userThoughts = await Thought.find({ user: userId })

    res.status(200).json(userThoughts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

authRouter.post("/thoughts", authenticateUser, async (req, res) => {
  try {
    const { thought } = req.body
    const userId = req.user._id
    const newThought = new Thought({ text: thought, user: userId })
    await newThought.save()
    res.status(201).json({ message: "Thought saved successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default authRouter
