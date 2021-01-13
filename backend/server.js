import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from "crypto";
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model("User", { 
  name: {
    type: String,
    unique: true,
  }, 
  password: { 
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true,
  },
});

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateUser = async (req, res, next) => {
  next();
};

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hi, welcome to our server')
});

// Create user - sign up
app.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body;
      console.log(`Name: ${name}`);
      console.log(`Password: ${password}`);
    const SALT = bcrypt.genSaltSync(); // the number between () is for how much variation you want in the password 8
    const user = await new User({
      name,
      password: bcrypt.hashSync(password, SALT),
    }).save();
    res.status(200).json({ userId: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err });
  }
});

// Login user
app.post("/sessions", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user && bcrypt.compareSync(password, user.password)) {
      //Compare passwords
      res.status(200).json({ userId: user._id, accessToken: user.accessToken });
    } else { 
      throw 'User not found';
    }
  } catch (err) { 
    res.status(404).json({ error: 'User not found' });
  }
});

// Secure endpoint, user needs to be logged in to access this 
app.get("/users/:id", authenticateUser); // Do we need to keep this? 
app.get("/users/:id", (req, res) => {
  res.status(501).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
