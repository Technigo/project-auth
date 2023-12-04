import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints';


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const User = mongoose.model('user', {
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
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Define root endpoint to display all available endpoints
app.get('/', (req, res) => {
  try {
    // Gets a list of required endpoints
    const endpoints = listEndpoints(app);

    // Respond with the list of endpoints
    res.json({ endpoints });
  } catch (error) {
    // Handle the error appropriately for the root endpoint
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//endpoint to post userdata
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

// Protected endpoint, accessible only when the user is logged in
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  // The authenticateUser middleware ensures that only logged-in users reach this point
  res.json({ secret: 'this is a secret message :-)' });
});


app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken, name: user.name });
  } else {
    res.json({ notFound: true });
  }
})
// Start the server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
