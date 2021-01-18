import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Added schema to be able to make the validation on choosen password and not hashed value
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true,
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next(); 
  }
  
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

  next(); // Values are written to the database
})

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization'); //Another part of the request as body
    const user = await User.findOne({ accessToken });

    if (!user) {
      throw 'User not found!';
    }
    req.user = user; // have access to req.user in endpoint
    next();
  } catch (err) {
    const errorMessage = 'Please try logging in again';
    res.status(401).json({error: errorMessage})
  }
}

const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

// Endpoint to register user
app.post('/users', async (req, res) => {
  try {
    const { name, password } = req.body; // If we didnt use the schema we could do a validation here instead
    const user = await new User({
      name,
      password,
    }).save();
    res.status(200).json({
      userId: user._id,
      accessToken: user.accessToken,
      userName: user.name,
    });

  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err });
  }
})
// Endpoint login
app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        userId: user._id,
        accessToken: user.accessToken,
        userName: user.name
      })
    } else {
      throw 'User not found';
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
})

// Authenticated endpoint to GET user specific information
app.get('/users/:id/secret', authenticateUser);
app.get('/users/:id/secret', async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId != req.user._id) {
      console.log("User dont have access to this secret")
      throw 'Access denied'
    };
    const secretMessage = `This is a secret message for ${req.user.name}`;
    res.status(200).json({ secretMessage })
  } catch (err) {
    res.status(403).json({ error: 'Access Denied' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
