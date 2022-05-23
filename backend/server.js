import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';
import getEndpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authy';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
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
  },
});

const User = mongoose.model('User', UserSchema);

const authenticateUser = async (req, res, next) => {

  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken: accessToken });
    
    if (user) {
      next();
    } else {
      res.status(401).json({ 
        response: "Please log in.",
        success: false 
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "You are logged in.", 
      success: false
    });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(getEndpoints(app));
});

//--------------------USER REGISTRATION ENDPOINT--------------------//
app.post('/registration', async (req, res) => {
  const { username, email, password } = req.body; //Maybe that we won't need email?
  // DO NOT STORE PLAINTEXT PASSWORDS
  try {
    
    const salt = bcrypt.genSaltSync();

    if (password.length < 8) {
      res.status(400).json({
        response: "Password must be at least 8 characters long",
        success: false
      });
    } else {
      const newUser = await new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({ 
        response: {
          username: newUser.username,
          userId: newUser._id, 
          accessToken: newUser.accessToken
        },
        success: true
      });
    }
  } catch (error) {
    res.status(400).json({ 
      response: error,
      success: false,
      message: "Could not create user."
    });
  }
});

//--------------------PROFILE PROTECTED / AUTENTICATED ENDPOINT--------------------///
app.get('/profile', authenticateUser, async (req, res) => {
  try {
    res.status(200).json({
      response: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
      success: true,
    });
  } catch (error) {
    res.status(401).json({ 
      errors: error,
      response: "Failed to log in." //I don't get this one. This comes upp when I use the right accessToken. It should be the other way around. 
    });
  }
});

//--------------------USER LOGIN ENDPOINT--------------------//
app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;


  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ 
        success: true,
        username: user.username,
        userId: user._id, 
        accessToken: user.accessToken 
      });
    } else {
      res.status(400).json({ 
        reponse: "Username and password don't match.",
        success: false    
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    });
  }
});

///CORS - HAVEN'T DONE ANYTHING WITH THIS
//////CORS v2
// app.use(cors({
//   origin: "https://my-origin.com"
// }));

/// CORS V3
// const allowedDomains = [
//   "http://lalala.io",
//   "http://something.com",
//   "https://lorem.com",
// ];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedDomains.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("domain not allowed"), false);
//     }
//   }
// }));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
