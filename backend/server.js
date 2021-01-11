import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  accessToken:{
    type:String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const authenticateUser = async(req,res,next) => {
  //next tells to continue execution if everything is ok
  //find a user based on the accesstoken, if it matches the one stored in the database and the one from the header 
  const user = await User.findOne({accessToken: req.header('Authorization')});
  //here we check if the user exists basing the search on the access token, if it doesn't system will log them out
  if(user){
    req.user = user;
    next();
  } else {
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

//sign up endpoint
app.post('/users', async (req,res) => {
  //this is a useful practice before you actually create an endpoint, you inform frontend that the endpoint is not created yet
  //res.status(501).send();
  try {
    //user registers with the name, email and password
    const {name, email, password} = req.body;
    //salt adds variations to the password
    const salt = bcrypt.genSaltSync();
    //console.log(`Name: ${name}`);
    //console.log(`email: ${email}`);
    //console.log(`password: ${password}`);
    //bcrypt turns the password to a hexadecimal representation of the password
    const user = new User({name, email, password: bcrypt.hashSync(password, salt)});
    //save the user to the database
    user.save();
    //we should not send back vulnerable information here
    //return a status and creates an access token when they log in
    res.status(201).json({id:user._id, accessToken: user.accessToken});  
  } catch (err) {
    //validation rules from our model will trigger the bad request if there is a conflict
    res.status(400).json({message:'Could not create user', erros: err.errors});
  }
});

//we protect this information by using the function authenticateUser that checks up if the user can be found by accesstoken
app.get('/secrets', authenticateUser);
app.get('/secrets', (req,res) => {
  res.json({secret:'This is a super secret message'});
});

////sign in endpoint
app.post('/sessions', async(req,res) =>{
  const user = await User.findOne({email:req.body.email});
  //if user exists and the password sent in the JSON body matches the one we have stored in the database
  //the first argument is the clear password from request and the second is the hashed one
  if(user && bcrypt.compareSync(req.body.password, user.password)){
    res.json({userId:user._id, accessToken:user.accessToken});
  } else {
    res.json({notFound:true});
  }
})

//get user specific information
app.get('/user/:id', async (req,res) => {
  res.status(501).send();
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
