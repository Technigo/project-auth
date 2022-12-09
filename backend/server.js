import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-tika-maria";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
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
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model('User', userSchema)

// Routes starts here
app.get("/", (req, res) => {
  res.send("Tika and Maria's project");
});

// The endpoint where the new user register
app.post("/register", async (req, res) => {
  const {username, password} = req.body
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 4) {
      res.status(400).json({
        success: false,
        response: "Your password must be longer than 4 characters."
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({
        success: true,
        response: {username: newUser.username, accessToken: newUser.accessToken, id: newUser._id}
      })
    }
  } catch(error) {
    res.status(400).json({
      success: false,
      response: "Error"
    })
  }
})

// Endpoint for logging in
app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({
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
        response: "username or password is incorrect"})
    }
  } catch (error){
    res.status(500).json({ success: false,
      response: error})
  }
})

// To authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try{
    const user = await User.findOne({accessToken: accessToken});
    if(user){
      next()
    }else{
      res.status(401).json({ success: false,
        response: "please login"
      })
    }
  } catch(error) {
    res.status(400).json({ success: false,
      response: error
    })
  }
}

// Successful login then go to secret. This is only used for the backend part, where you can see these messages in Postman.
app.get("/secret", authenticateUser)
app.get("/secret", (req, res) => {
  const secretMessage = "Welcome to the secret chamber"
  try{
    res.status(200).json({
      success: true,
      secretMessage,
    });
  } catch(error){
    res.status(401).json({
      success: false,
      response: "Secret chamber is locked",
    });
  }
})

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});