import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/auth'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
    name: {
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

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async(req, res, next) => {

    try {
        const user = await User.findOne({
            accessToken: req.header('Authorization')
        })
        if (user) {
            req.user = user
            next()
        } else {
            res.status(401).json({ loggedOut: true, message: 'Please try to login again' })
        }
    } catch (err) {
        res
            .status(403)
            .json({ message: 'acess token missing or wrong', errors: err.errors })
    }
}




// Start defining your routes here
app.get('/', (req, res) => {
    res.send('Hello world')
})

// Create user  - sign up
app.post('/users', async(req, res) => {
    try {
        const { name, password } = req.body
        const user = new User({ name, password: bcrypt.hashSync(password) })
        const saved = await user.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ message: 'could not save user', errors: err.errors })
    }
})

// Secure endpoint, user need to be logged in
app.get('/users/:id', authenticateUser)
app.get('/users/:id', async(req, res) => {
    res.send('hellow fella')
})

// login user
app.post('/sessions', async(req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name })
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(201).json({ useId: user._id, accessToken: user.accessToken })
        } else {
            res.status(401).json({ notFound: true })
        }

    } catch (err) {
        res.status(400).json({ message: 'could not save user', errors: err.errors })
    }
})



// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})