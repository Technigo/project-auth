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
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
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

const User = mongoose.model('User', userSchema)

const port = process.env.PORT || 8080
const app = express()


app.use(cors())
app.use(express.json())

const userAuthentication = async (req, res, next) => {
try {
  const user = await User.findOne({
    accessToken: req.header('Authorization')
  })
}
}


app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
