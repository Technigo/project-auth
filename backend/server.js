import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

// const Thought = mongoose.model('Thought', {
//   message: String
// });

const User = mongoose.model('User', {
  username: {
    type: String, 
    required: true,
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
})

// Our authenticator that will enable/unenable us from entering content or not, it will with the help of accesstoken that it finds in our database give us access to content
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error})
  }
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// app.get('/thoughts', authenticateUser);
// app.get('/thoughts', async (req, res) => {
//   const thoughts = await Thought.find();
//   res.json(thoughts)
// });

app.get('/thoughts', authenticateUser);
app.get('/thoughts', async (req, res) => {
  const { message } = req.body;
  try {
    // const newThought = await new Thought({ message }).save();
    // res.json(newThought)
    res.json({ message: "here is a message :D" })
  } catch (error) {
    res.status(400).json({ message: "Invalid Request", error })
  }
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body; // We separated username and password from the body

  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User ({
      username, 
      password: bcrypt.hashSync(password, salt)
    }).save();

    if (newUser) {
      res.json({
        usedID: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken
      });
    }
    
  } catch(error) {
    if(error.code===11000){
      res.status(400).json({ error: 'Username already exists', field: error.keyValue })
    }
    res.status(400).json({ message: 'Invalid Request', error })
  }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        userID: user._id, // lägg till success true etc
        username: user.username,
        accessToken: user.accessToken
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error })
  }

})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})


// Crypto is used to generate internal identification 