import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// create a user model using mongoose
// with properties for your registered user
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    // i would like to remove this unique true for email
    // bcs i hated this when i use website.
    // i wanted to create multiple id but was hard to have many email for it
    // but since i need to learn the structure first, ill leave this here haha
    unique: true
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

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start ////////
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// to store a users access token here
// so, we store using here, but how we see it back?
app.post('/users', async (req, res) => {
  try {
    const {name, email, password} = req.body
    const user = new User({name, email, password: bcrypt.hashSync(password)})
    user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (error) {
    res.status(400).json({message: 'could not create user', errors: err.errors})
    // get err
    // open diegos codealong
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// need data validation because regardless of what i input, it creates new user
// then there should be user list that has plenty of user. where is it?