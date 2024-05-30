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
const SALT_ROUNDS = 12
const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,}$/
  return regex.test(password)
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 5,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: passwordValidator,
      message:
        "Password must contain at least one uppercase letter, one number, and be at least 8 characters long",
    },
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
})
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  }
  next()
})
const User = mongoose.model("User", userSchema)
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

// Enable CORS middleware
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// Start defining your routes here
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
