import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


// Code along 
// const User = mongoose.model("User", {
// name: {
//   type: String,
//   unique: true
// },
// password: {
//   type: String,
//   required: true
// },
// accesToken: {
// type: String,
// default: () => crypto.randomBytes(128).toString("hex")

//   }
// })

// const authenticateUser = async (req, res, next) => {
// const user = await User.findOne ({accessToken:req.header("Autorization")})
// if(user){
// req.user = user
// next()
// } else {
//   res.status(404).json({loggedOut:true})
// }
// }

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());



// From Live session

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
      type: String,
      required: true,
  },

  // npm install crypto (npm i crypto)
accessToken: {
  type: String,
  default: () => crypto.randomBytes(128).toString("hex")
}
})

const User = mongoose.model("User", UserSchema)

app.post ("/register", async (req, res) => {
  const {username, password } = req.body
// npm install bcrypt
// const code = [1, 2, 3, 4]
// const MakeCodeSecret = (codeArr) => {
  // const secretMessage = codeArr.map(singleNumber => singleNumber +1)
  // return secretMessage
//}
// transformCode = makeCodeSecret(code)

  try {
    const salt = bcrypt.genSaltSync()
      if (password.length < 8) {
        res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      })
    } else {
      const newUser = await new User({ username: username, password: bcrypt.hashSync(password, salt)}).save()
      res.status(201).json({
         succes: true,
         response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
         }
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password)) {
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
        response: "Credentials didn't match"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    })
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: false
    })
  }
}

const ThoughtsSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date ()
  },
  hearts: {
    type: Number,
    default: 0
  }
})

const Thought = mongoose.model("Thought", ThoughtsSchema)

app.get("/thoughts", authenticateUser)
app.get("/thoughts", async (req, res) => {
  res.status(200).json({
    success: true,
    response: "All the thoughts"
  })

})


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


// Code along 
// app.post("/users", async (req, res => {
// try {
// const {name, email, password} = req.body
// const user = new User ({name, email, password: bcrypt.hashSync(password)})
// user.save()
// res.status(201).json({id: user._id, accessToken: user.accesToken})
// } catch(err){
//   res.status(400).json({message:"Could not create user", errors: err.errors})


// }

// }))
// app.get("/secrets", authenticateUser)
// app.get("/secrets", (req, res) => {
// res.json({secret: "This is a super secret message"})
// })
// app.post("/session", async(req, res) =>{
// const user = await User.findOne({email: req.body.email})
// if(user && bcrypt.compareSync(req.body.password, user.password)){
//   res.json({unserId: user._id, accessToken: user.accesToken})
// } else {
//   res.json({notFound: true})
//  }}

// )
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
