import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/project-mongo";
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello user!!");
});

////////////////////////
const { Schema } = mongoose; 

const UserSchema = new mongoose.Schema({
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
    // npm install crypto in order to use this.
    type: String, 
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = mongoose.model("User", UserSchema)
////////////Registration /////////////////
app.post("/register", async (req, res) => {
  const {username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
    }).save()
  res.status(201).json({
    success: true, 
    response: {
      username: newUser.username,
      id: newUser._id,
      accessToken: newUser.accessToken
    }
  })
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e
    })
  }
})

////////////////LOGIN//////////////////
app.post("/login", async (req, res) => {
  const {username, password } = req.body
  try {
    const user = await User.findOne({username: username})
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        success: true, 
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        } 
      })

    } else {
      res.status(400).json({
        success: false,
        resonse: "Credentionals do not match"
      })

    }
  } catch (e) {
    res.status(500).json({
      success: false,
      resonse: e
    })
  }
})

//Thoughts


const ThoughtSchema = new Schema({
  message: {
    // most important one
    type: String,
    required: true, // required true which means the user MUST provide a message in order to send it. 
    trim: true // removes unnecessary whitespaces from string
  },  
  user: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  
}); 

const Thought = mongoose.model("Thought", ThoughtSchema)

//Authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try{
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false, 
        response: "Please login"
      })
    }
  } catch(e){
    res.status(500).json({
      success: false,
      response: e
    })
  }
}

app.get("/thoughts", authenticateUser)
app.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find({})
  res.status(200).json({
    success: true, 
    response: thoughts
  })
}) // add try catch blocks

app.post("/thoughts", authenticateUser)
app.post("/thoughts", async (req, res) => {
  const { message } = req.body;

  const accessToken = req.header("Authorization");
  const user = await User.findOne({accessToken: accessToken});

  const thoughts = await new Thought({message: message, user: user._id}).save();

  res.status(200).json({
    success: true, 
    response: thoughts
  })
})


///////////////////////


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
