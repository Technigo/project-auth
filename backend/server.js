import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import listEndpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')

  }
})




const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
})

// SIGN UP
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    
    const user = new User({ name, email, password: bcrypt.hashSync(password, salt) });
    const newUser = await user.save();

    res.status(201).json({ userId: newUser._id, accessToken: newUser.accessToken });
  } catch (error) {
    res.status(400).json({ message: 'Could not create user', error });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
