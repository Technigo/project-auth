import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
const listEndpoints = require('express-list-endpoints');

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  createdAt:{
    type:String,
    default: ()=> new Date()
  },
  accessToken: {
    // npm install crypto for this
    type:String,
    default: () => crypto.randomBytes(128).toString("hex")
  },
  avatar:{
    type:String,
    default:"/images/defaultAvatar.png"
  } ,
  badges:{
    type:Array,
    default:['/images/firstBadge.png']
  },
  history:{
    type:Array,
    default:[
    ]
  },
  totalScore:{
    type:Number,
    default:0
  }

  /* from the figma file
  user:[
    {‘name’: ‘John’},
    {‘email’:’john@me.com’},
    {‘password’: ‘test1’},
    {‘avatar’: ‘/pathToSvg.svg’},
    {‘badges’: [‘badge1’, ‘badge2’]},
    {‘history’: [
    {‘quizname’:’quiz1’, ‘score’:4, ‘timestamp’:’2023-05-05’},
    {‘quizname’:’quiz2’, ‘score’:4, ‘timestamp’:’2023-05-06’},
    ]},
    {‘totalScore’:100}*/


});

const User = mongoose.model("User", userSchema);

// register user and login requests
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
   try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User ({
      username: username,
      password: bcrypt.hashSync(password, salt),
      email:email
    }).save();
    if(newUser){
    res.status(201).json({
      success:true,
      response:{
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken,
        password:newUser.password
      }
    })
    } else {
    res.status(404).json({
    success:false,
    response:'Failed registration. Email or username is not valid.'
})
    } // check this later

  } catch (e) {
    res.status(400).json({
      success:false,
      response: {
        message:'Username or email is already used',
        error:e
      }
    })
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        success: true,
        response: {
          username: user.email,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials do not match"//check later
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response:{
        error:error,
        message:"Internal server error" //check later
      }
    });
  }
});

// Authenticate user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
  const user = await User.findOne({accessToken: accessToken});
  if (user) {
    next();
  } else {
    res.status(401).json({
        success: false,
        response: "Please log in"
      })
  }
} catch (error) {
  res.status(500).json({
    success: false,
    response:{
      message:'Internal server error',
      error:error
    } 
})
}};

// Get and post totalScore
// app.get("/thoughts",authenticateUser);
// app.get("/thoughts", async (req, res) => {
//  const accessToken = req.header("Authorization");
//  const user = await User.findOne({accessToken: accessToken});
//  const thoughts = await Thought.find({user: user._id})
  //https://mongoosejs.com/docs/populate.html
//  res.status(200).json({success: true, response: thoughts})
// });
// app.post("/totalScore",authenticateUser);
// app.post("/totalScore", async (req, res) => {
//   const { message } = req.body;
//   const accessToken = req.header("Authorization");
//   const user = await User.findOne({accessToken: accessToken});
//   const totalScore = await new Score({score: score, user: user._id}).save()
//   res.status(200).json({success: true, response: totalScore})
// });

//updating total score, history, badges, avatar
app.patch("/user",authenticateUser);
app.patch("/user", async (req, res) => {
 try {
    const { totalScore, badges, avatar, history } = req.body;
    const accessToken = req.header("Authorization");
    const user = await User.findOneAndUpdate(
      { accessToken: accessToken },
       {
        totalScore: totalScore,
        badges: badges,
        avatar: avatar,
        history: history // check how to add timestamp
      },
      { new: true }
    );

    if (user) {
      res.status(200).json({ success: true, response: user });
    } else {
      res.status(404).json({ success: false, response: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, response: "Internal server error." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
