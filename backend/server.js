import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { generateToken } from './jwtUtils'; // Import the JWT utility functions
import User from './models/userModel';

dotenv.config();

// Set mongoose to allow flexible queries
mongoose.set('strictQuery', false);

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost/project-mongo';
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
  try {
    const accessToken = req.header('Authorization');

    if (!accessToken) {
      return res.status(401).json({ loggedOut: true, message: 'No access token provided' });
    }

    // Verify the token using JWT
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Use the decoded information if needed
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ loggedOut: true, message: 'Invalid access token' });
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

    // Generate a JWT for the user
    const payload = { userId: user._id, email: user.email };
    const token = generateToken(payload);

    res.status(201).json({ id: user._id, accessToken: token });
  } catch (err) {
    console.error('User Registration Error:', err);

    // Log the error details
    console.error(err);

    if (err.code === 11000) {
      res.status(400).json({ message: 'Email is already in use.' });
    } else {
      res.status(500).json({ message: 'Could not create user. Please try again later.' });
    }
  }
});

// Protected endpoint, accessible only when the user is logged in
app.get('/secrets', authenticateUser, (req, res) => {
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

  const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
  res.json({ secret: randomSecret });
});

// Endpoint for user login
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate a JWT for the user
      const payload = { userId: user._id, email: user.email };
      const token = generateToken(payload);

      res.json({ userId: user._id, accessToken: token, name: user.name });
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
