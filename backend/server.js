import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from "bcrypt-nodejs";

const SALT = bcrypt.genSaltSync(10);
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// User Model 
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ loggedOut: true, message: 'Please try logging in again' });
    };
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Access token is missing or wrong', errors: err });
  };
};

// Defines the port the app will run on. 
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// REGISTRATION ENDPOINT 
app.post('/users', async (req, res) => { 
  try { 
    const { name, password } = req.body;
    const user = new User({ name, password: bcrypt.hashSync(password, SALT)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  } catch (err) {
    res.status(400).json({message: "Could not create user", errors:err.errors})
  };
});

// SECURE ENDPOINT
app.get('/users/:id', authenticateUser);
app.get('/users/:id', (req, res) => {
  res.status(501).send();
});

// LOGIN ENDPOINT 
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({ notFound: true });
    };
  } catch (err) {
    res.status(404).json({ notFound: true });
  };
});


app.get('/secrets', (req, res) => {
  res.json ({secret:'this is a super secret message'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
