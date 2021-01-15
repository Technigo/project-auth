import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://clakje:qTycua8bhA5rjWr@cluster0.dia4y.mongodb.net/claudiaellenAUTH?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  },
});

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    const user = await User.findOne({ accessToken });
    if (!user) {
      throw 'Login error ';
    }
    req.user = user;
    next();
  } catch (err) {
    const errorMessage = 'Try another username/password';
    console.log(errorMessage);
    res.status(401).json({ error: errorMessage });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Claudia')
})

//salt adds som variation to the hash function, per user
app.post('/users', async (req,res) =>{
  try{
    const {name, password} = req.body;
    //Do not store plaintext passwords!
    const salt = bcrypt.genSaltSync(10)
    const user = await new User({
      name, 
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(201).json({
      userId:user._id,
      accessToken:user.accessToken
    });
  }catch(err){
    res.status(400).json({
      message: 'Could not create user', errors: err.errors
    });
  }
})

app.get('/secrets', authenticateUser); 
app.get('/secrets', (req, res) => {
  res.json({secret: `This is a secret message for ${userId}`});
})

app.post('/sessions', async(req, res) => {
  try{
    const user = await User.findOne({name: req.body.name});
    if(user && bcrypt.compareSync(req.body.password , user.password)) {
      res.status(201).json({userId: user._id, accessToken: user.accessToken});
    }else {
      throw "User not found"
    }
  } catch (error) {
    res.json({notFound: true });
  } 
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
