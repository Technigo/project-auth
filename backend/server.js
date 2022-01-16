import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"
import dotenv from 'dotenv'
import listEndpoints from 'express-list-endpoints';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI" //database name

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  // eslint-disable-next-line no-console
  console.log(`database connected`)
}, (onreject) => {
  // eslint-disable-next-line no-console
  console.log(onreject);
})
mongoose.Promise = Promise

const port = process.env.PORT || 9000
const app = express()

//v-1. Allow all domains
app.use(cors())

//v-2. Allow one specific domain
// app.use(cors({
//   origin: "http://localhost:6000"
// }))

//v-3. Allow multiple domains
// const allowedDomains = [
//   "http://localhost:3000"
// ]
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedDomains.includes(origin)) {
//       return callback(null, true); //"next"
//     } else {
//       return callback(new Error('This domain is not allowed'), false);
//     }
//   }
// }))

app.use(express.json())

app.get('/', (req, res) => {
  res.json(listEndpoints(app));
})

//collection name
const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const Manga = mongoose.model("Manga", {
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  wiki: {
    type: String,
    required: true,
  },
});


const authenticateUser = async (req, res, next) => {

  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') })

    if (user) {
      req.user = user;
      console.log(req.user)
      next();
    } else {
      res.status(401).json({ message: "Please log in", loggetOut: true, success: false })
    }
  } catch (error) {
    res.status(400).json({ errors: error, success: false })
  }
}

//Authentication - 401 (Unauthorized) But should be unauthenticated
//Authorization - 403 (Forbidden) But should be unauthorized

//register a new user 
app.post('/signup', async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "Password must be at least 5 characters long"
    }
    const user = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: user.accessToken
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false, });
  }
})

//user login
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json(
        {
          response: {
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken
          },
          success: true,
        })
    } else {
      //user does not exist
      //encripted password does not match
      res.status(404).json({ message: "Email or password doesn't match", success: false })
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})

app.get('/manga', authenticateUser);
app.get('/manga', async (req, res) => {
  try {
    const mangas = await Manga.find();
    if (mangas) {
      res.status(201).json({ response: mangas, success: true });
    } else {
      res.status(404).json({ message: 'no info', success: false });
    }
  } catch (error) {
    res.status(500).json({
      meesage: "can't find mangas", errors: error
    })
  }

});


//allow only logged-in users to see this info
app.get('/profile', authenticateUser, async (req, res) => {
  try {
    res.status(200).json({
      response: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      success: true
    })
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
