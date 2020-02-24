import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

console.log('Start1112')

const User = mongoose.model('User', {
  name: {
   type: String,
   unique: true
  },
  email: {
   type: String,
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

});


//function to authenticate user, if user is registered it gets an accesstoken and can access secret info
const authenticateUser = async (req, res, next) => {
  if (!req.header('Authorization')){
    res.status(401).json({status: 'No Authorization header received'});
  }
  const user = await User.findOne({accessToken: req.header('Authorization')});
  if(user){
    req.user = user;
    next();
  }else {
    res.status(401).json({loggedOut: true});
  }
}

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
  res.send('Hello world')
})

//a post to '/users' saves a new user that registers with name, email and password (password saves crypted)
app.post('/users', async (req, res) => {
try {
  const {name, email, password} = req.body;
  const user = new User({name, email, password: bcrypt.hashSync(password)});
  // Must use "await" here, else the try/catch will not work since "save" an asynch function
  await user.save()
  res.status(201).json({id: user._id, accessToken: user.accessToken});

} catch (err) {
  res.status(400).json({message: 'Could not create user', errors: err.errors});
}
});


//a get to '/secrets' gives the user access to secrets if the user is authenticated (exists)
app.get('/secrets/:id', authenticateUser);
app.get('/secrets/:id', (req, res) => {
  console.log('Inside /secrets')
res.json({secret: 'This is a message only shown if user is logged in and has an accessToken'});
});



app.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(user && bcrypt.compareSync(req.body.password, user.password)){
    res.json({userId: user._id, accessToken: user.accessToken});
  }else {
    res.json({notFound: true});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
