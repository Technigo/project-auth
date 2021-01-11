import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String
    // unique: true,
    // required: true
  },
  email: {
    type: String
    // unique: true,
  },
  password: {
    type: String
    //required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),

  }
})

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
})

//? SIGN UP
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await new User({ name });
    
    const newUser = await user.save();

    res.status(201).json({ 
      id: newUser._id, 
      accessToken: newUser.accessToken
    });
  } catch (err) {
    res.status(400).json({message:'Could not create user', errors: err.errors})

  }
})

app.get('/users', async (req, res) => {
  try {
  const savedUsers = await user.find();
  res.json(savedUsers);
  // res.status(201).json({ message: 'Succes!'});
} catch (err) {
  res.status(400).json({ message: 'Bad request, could not find saved user', errors: err.errors });
}
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
