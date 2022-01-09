import express from 'express'
import cors from 'cors'
// using this library to create the access token 
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

// creating user model
const User = mongoose.model('User', {
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
		default: () => crypto.randomBytes(128).toString('hex')
	}
})

const authenticateUser = async (req, res, next) => {
	const user = await User.findOne({accessToken: req.header('Authorization') })
	if(user) {
		req.user = user;
		next()
	} else {
		res.status(401).json({loggedOut: true})
	}
}

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/secrets', authenticateUser)

app.get('/secrets', (req, res) => {
	res.json({secret: "This is super secret"})
})

app.post('/users', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await new User({ name, email, password: bcrypt.hashSync(password) })
		user.save()
		res.status(200).json({ id: user._id, accessToken: user.accessToken })
	} catch (error) {
		if (error.code === 11000) {
      if (error.keyValue.name) {
        res.status(400).json({
          success: false,
          message: "Username already taken, sorry! :)",
          error,
        });
      } else if (error.keyValue.email) {
        res.status(400).json({
          success: false,
          message: "Email already taken, sorry! :)",
          error,
        });
      }
    }
	}
})

app.post('/sessions', async (req, res) => {
	const user = await User.findOne({ email: req.body.email})
	if(user && bcrypt.compareSync(req.body.password, user.password)) {
		res.json({userId: user._id, accessToken: user.accessToken})
	} else {
		res.json({notFound: true})
	}
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
