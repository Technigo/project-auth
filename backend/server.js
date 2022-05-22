import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import getEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authy";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model("User", {
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
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header("Authorization")});
  if(user){
    req.user = user;
    next();
  }else {
    res.status(401).json({message: "You are not authenticated.", loggedOut: true});
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
app.get("/", (req, res) => {
  res.send(getEndpoints(app));
});


//--------------------USER REGISTRATION ENDPOINT--------------------//
app.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // DO NOT STORE PLAINTEXT PASSWORDS
    const user = new User({name, email, password: bcrypt.hashSync(password)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  } catch (err) {
    res.status(400).json({message: "Could not create user.", errors: err.errors});
  }
});

//--------------------PROFILE PROTECTED / AUTENTICATED ENDPOINT--------------------///
app.get("/profile", authenticateUser, async (req, res) => {
  try {
    res.status(200).json({
      response: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      success: true
    });
  } catch (error) {
    res.status(401).json({errors: error});
  }
});

//--------------------USER LOGIN ENDPOINT--------------------//
app.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(user && bcrypt.compareSync(req.body.password, user.password)){
    res.json({userId: user._id, accessToken: user.accessToken});
  }else{
    res.json({notFound: true})
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
