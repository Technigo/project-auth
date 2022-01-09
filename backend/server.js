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

const port = process.env.PORT || 6000
const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json(listEndpoints(app));
})


//collection name
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
    Required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggetOut: true })
  }
}

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (e) {
    res.status(400).json({ message: "Could not create user", errors: e.errors });
  }
})

//para retornar info cuando ya esta logueado 
app.get('/user', authenticateUser, async (req, res) => {
  try {
    res.status(200).json({ message: "correctToken" })
  } catch (e) {
    res.status(500).json({ errors: e.errors });
  }
})


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken })
    } else {
      //user does not exist
      //encripted password does not match
      res.json({ notFound: true })
    }


  } catch (e) {
    res.status(500).json({ errors: e.errors });
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
