import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  accessToken: {type: String, default: ()=> crypto.randomBytes(128).toString("hex")}
})

const User = mongoose.model('user', UserSchema)

const MovieSchema = new mongoose.Schema({
  Year: {type: Number},
  Title: {type: String},
  Rated: {type: String},
  Director: {type: String},
  Released: {type: String},
  Writer: {type: String},
  Production: {type: String},
  Actors: {type: String},
  Runtime: {type: String},
  Awards: {type: String},
  ImdbVotes: {type: String},
  ImdbRating: {type: Number},
  RottenTomatoScore: {type: String},
  Metascore: {type: Number},
}); 


const Movie = mongoose.model("Movie", MovieSchema);

//Middleware that checks accessTokens that are created when a user is registered
const authentUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({loggedOut: true});
  }
}

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Batman!");
});

// Sign up (create new user) POST
app.post('/users', async (req, res) => {
  try{
    const {name, password} = req.body;
    //DO NOT STORE PLAINTEXT PASSWORDS!!!
    const user = new User({name, password: bcrypt.hashSync(password)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  }catch (err){
    res.status(400).json({message:'Could not create user', errors: err.errors})
  }
})
app.get('/secrets', authentUser);
app.get('/secrets', (req, res) =>{
  res.json({secret: 'This is a secret message'})
})

//Log in (find user and validate the password) POST
app.post('/login', async (req, res) =>{
  const user = await User.findOne({name:req.body.name})
  if(user && bcrypt.compareSync(req.body.password, user.password)){
    res.json({userId: user._id, accessToken: user.accessToken})
  } else {
    res.json({notFound: true})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
