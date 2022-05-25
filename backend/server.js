import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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

const User = mongoose.model("User", UserSchema)

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
})

app.get("/authenticated", async (req, res) => {
  try {
    const allAuthenticated = await User.find({}).limit(20)     
    res.status(200).json(allAuthenticated)
  }catch (error) {
    res.status(400).json({response: error, success: false})
  }
  
})

// Only for registration of new user
app.post("/register", async (req, res) => {

  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()

    if(password.length < 8) {
      res.status(400).json({
        response: "Password must be at least 8 characters long",
        success: false
      })
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save()
  
      res.status(201).json({
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id
        },
        success: true
      })
  }
  } catch(error) {
    res.status(400).json({
    response: error,
    success: false
    })
  }
})

// Only for logging in
app.post("/login", async(req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({username})
    if(user && bcrypt.compareSync(password, user.password))
    res.status(200).json({
      repsonse: {
        username: user.username,
        accessToken: user.accessToken,
        userId: user._id
      },
      success: true
    })
  } catch(error) {
    res.status(400).json({
      response: "Username and password don't match",
      success: false
    })
  }
})


// Autheticating the user is logged in and have access to asked function
const authorizeUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")

  try {
    const user = await User.findOne({accessToken: accessToken})
    if(user) {
      next()
    } else {
      res.status(401).json({
        response: "You need to be logged in to proceed",
        success: false
      })
    }
  } catch(error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}

// Should we change Thoughts?
const ThoughtSchema = new mongoose.Schema({
  message: String,
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  }
})

const Thought = mongoose.model("Thought", ThoughtSchema)


// Example text to show when authenticated
app.get("/thoughts", authorizeUser)
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({})
  res.status(200).json({response: thoughts, success: true})
})

app.post("/thoughts", async (req, res) => {
  const {message} = req.body
  try {
    const newThought = await new Thought({message}).save()
    res.status(201).json({response: newThought, success: true})
  } catch (error) {
    res.status(400).json({response: error, success: false})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


///// CORS version1 (allows all origins)
// app.use(cors())


////// CORS version2
// app.use(cors({
//   origin: "https://my-origin.com"
// }))


///// CORS version3
// const allowedDomains = [
//   "http://lalala.io",
//   "http://something.com",
//   "https://lorem.com",
// ]
// app.use(cors({
//   origin: (origin, callback) => {
//     if(allowedDomains.includes(origin)){
//       return callback(null, true)
//     } else {
//       return callback(new Error("domain not allowed"), false)
//     }
//   }
// }))