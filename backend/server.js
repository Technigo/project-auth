import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: [6, 'e-mail is too short']
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password must be at least 5 characters']
  },
  name: {
    type: String,
    required: false,
    minlength: [2, 'Name is too short']
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true, message: 'Log in failed. Please try to log in again'});
    }
  } catch (err) {
    res.status(403).json({ message: ' Acces token is missing or wrong', errors: err });
  }
};

// Registration endpoint (creates user)
app.post('/users', async (req, res) => {
  try {
    const { email, name, password } = req.body
    const salt = bcrypt.genSaltSync();
    const user = await new User({ 
      email,
      name, 
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(201).json({ userId: user._id, accessToken: user.accessToken }); //send user id and access token back to the user
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err });
  }
});

//Secure endpoint, protected by authenticateUser. Should :id be here or not?
//Looks up the user based on the access token stored in the header
app.get('/users/secret', authenticateUser);
app.get('/users/secret', (req, res) => {
  const secretMessage = 'This is a secret message!'
  res.status(201).json({ secretMessage });
});

//Login user
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      throw "Login failed. User not found.";
    }
  } catch (err) {
    res.status(404).json({ message: 'Login failed. User not found.', errors: err });
  }
});

//Log out
app.post('/users/logout', authenticateUser)
app.post('/users/logout', async (req, res) => {
  try {
    req.user.accessToken = null;
    await req.user.save();
    res.status(200).json({ loggedOut: true });
  } catch (err) {
    res.status(400).json({ error: 'Could not log out'});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
