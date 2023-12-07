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
const secrets = [
  'I have a hidden talent for juggling flaming torches while riding a unicycle.',
  'Every Friday night, I secretly host a karaoke party for my collection of talking houseplants.',
  'I once saved the day by using my expert knowledge of obscure trivia during a pub quiz.',
  'My guilty pleasure is binge-watching cheesy 80s sitcoms in my pajamas while eating ice cream straight from the carton.',
  'I have a secret stash of chocolate hidden in my sock drawer that I only indulge in when nobody is watching.',
  'I am a closet poet and have written a collection of love poems dedicated to my favorite type of pizza.',
  'I have a pet rock named Rocky, and we have deep philosophical conversations when no one is around.',
  'I am convinced that I have a secret admirer who leaves mysterious notes in my mailbox, but I have never found out who it is.',
  'I can speak fluent pig Latin and often use it to have private conversations in crowded places.',
  'I believe in the existence of a parallel universe where everyone communicates through interpretive dance.'
];

// Protected endpoint, accessible only when the user is logged in
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  // The authenticateUser middleware ensures that only logged-in users reach this point
  // Randomly select a secret from the array
  const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
  res.json({ secret: randomSecret });
});


app.post('/sessions', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken, name: user.name });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});
// Start the server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
