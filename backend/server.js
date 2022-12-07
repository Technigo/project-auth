import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
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
  //npm install crypto Remember to be in backend folder! 
  accessToken: {
    type: String, 
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", UserSchema);

const OrderSchema = new mongoose.Schema({
  flavor: {
    type: String, 
    required: true
  }, 
  createdAt: {
    type: Date, 
    default : () => new Date()
  },
  scoop: {
    type: Number, 
    default: 1
  }
});

const Order = mongoose.model("Order", OrderSchema);

// For pages only shown for the login user we need to do a authentication of the user. 
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization"); 
  try {
    // use the accessToken when its to easy to store a username in the header, accesstoken is uniqe for each user 
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: " Please log in ",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}


// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    Message: "Backend for login to our project page",
    Routes: [{
      "/register": "POST request where you register your profile",
      "/login" : "Login page for a user",
      "/order": "GET all orders and POST a new order"
    }]
  });
});

app.post("/register", async (req, res) =>{
  const { username, password } = req.body;
// npm install bcrypt
  try {
    const salt = bcrypt.genSaltSync();
    if(password.length < 8){
      res.status(400).json({
        success: false, 
        response: "Password must be at least 8 characters long."
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      // 201 is created 
      res.status(201).json({
        success: true, 
        response: {
          // send the username never password, ID is to help frontend
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  }catch(error) {
    res.status(400).json({
      success: false, 
      response: error
    })
  } 
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body; 

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true, 
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false, 
        response: "Credentials didn't match"
      });   
    }
  } catch(error) {
    res.status(500).json({
      success: false, 
      response: error
    });
  } 
});

app.post("/order", authenticateUser);
app.post("/order", async ( req, res) => {
  const { flavor, scoop, createdAt } = req.body; 
  try {
    const newFlavor = await new Order ({ flavor:flavor, scoop:scoop , createdAt:createdAt}).save()
    res.status(200).json({
      success: true, 
      response: newFlavor
    })
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
 
})

app.get("/order", authenticateUser);
app.get("/order", async ( req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
