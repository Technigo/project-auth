import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
import User from './models/userModel';

dotenv.config();

// Set mongoose to allow flexible queries
mongoose.set('strictQuery', false);

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URI || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Set up express app
const port = process.env.PORT || 8080;
const app = express();

// Enable cors and JSON body parsing
app.use(cors());
app.use(express.json());

// Middleware to authenticate user based on access token
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

// Root endpoint to display available endpoints
app.get('/', (req, res) => {
  try {
    const endpoints = listEndpoints(app);
    res.json({ endpoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for user registration
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: bcrypt.hashSync(password) });

    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });

  } catch (err) {
    console.error('User Registration Error:', err);
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email is already in use.' });
    } else {
      res.status(500).json({ message: 'Could not create user. Please try again later.' });
    }
  }
});

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

//Protected endpoint, accessible only when the user is logged in
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
  res.json({ secret: randomSecret });
});

// Endpoint for user login
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken, name: user.name });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('User Login Error:', err);
    res.status(500).json({ message: 'Could not authenticate. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});