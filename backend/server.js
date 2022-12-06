import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


const User= mongoose.model('User',{
  name:{
    type:String,
    unique:true
  }, 
  password:{
    type:String,
    required:true
  }, 
  accessToken:{
    type:String,
    default:() => crypto.randomBytes(128).toString("hex")
  }
})



// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/users', async (req, res) => {
  try {
    const user= await User.find({})
    .limit(10)
    .sort()
    .exec()
    res.status(200).json({success:true, data:user});

  }
  catch (err) {
res.status(400).json({success:false, err })
  }
})


app.get('/newUser', async (req, res) => {
  const {name, password} = req.body;
  const user = new User({name, password: bcrypt.hashSync(password)})
  try{
    const savedNewUser= await user.save();
    res.status(201).json({response: savedNewUser, success: true});
  }
  catch (err){
    res.status(400).json({
      message: "Coould not save new user",
      error: err.error,
      success: false
    })

  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
