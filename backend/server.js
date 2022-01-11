import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
//library to create the access token 
import crypto from 'crypto';
//hashing the password 
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({ //schema takes 3 properties: username, password and acessToken
	username: {
		type: String,
		unique: true, //not allowed users with same username
		required: true, //should be required
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: { //npm crypto installed. Creates a random string.
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'), //generates a random string that is going to be the unique identifier for that specific user
	},
});

//User model
const User = mongoose.model('User', UserSchema); //model always takes 2 arguments. //the first argument (user) i responsible for when mongo creates a collection for us...
//... it will take the value of the name and make first letter small and add s in the end and name the collection that.

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm startn
const port = process.env.PORT || 8080;
const app = express();

//

// Add middlewares to enable cors and json body parsing
// v1 - Allow all domains
app.use(cors());
app.use(express.json());

// // v2 - Allow only one specific domain
// app.use(
// 	cors({
// 		origin: 'https://my-project-frontend.com',
// 	})
// );

// // v3 - Allow multiple domains
// const allowedDomains = [
// 	'http://localhost:3000',
//   'https://week20-auth-backend.herokuapp.com/'
// ];
// app.use(
// 	cors({
// 		origin: (origin, callback) => {
// 			if (allowedDomains.includes(origin)) {
// 				return callback(null, true);
// 			} else {
// 				return callback(new Error('This domain is not allowed'), false);
// 			}
// 		},
// 	})
// );

app.use(express.json());

//AUTHENTICATION
const authenticateUser = async (req, res, next) => { //next it's being injected to every callback.  
  //we are going to check if the acessToken was sent in a request. 
  //if there will be acessToken send back information
	const accessToken = req.header('Authorization'); //find user by acessToken. acessToken we take from the request. Unique for acessToken is that it's send in header in the response.

	try {
		const user = await User.findOne({ accessToken }); 
		if (user) {
			next();
		} else {
			res.status(401).json({ response: 'Please, log in', success: false });
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
};

// Authentication - 401 (Unauthorized) But should be unauthenticated
// Authorization - 403 (Forbidden) But should be unauthorized

// Start defining your routes here

app.get('/profile', authenticateUser);
app.get('/profile', (req, res) => {
	res.send('Here is the profile page, only for users');
});

//POST Request
app.post('/signup', async (req, res) => { //always use request and response callback
	const { username, password } = req.body; //the required values

	try {
		const salt = bcrypt.genSaltSync();  //add a string randomizer called salt

		if (password.length < 5) {
			throw 'Password must be at least 5 characters long';
		}

		const newUser = await new User({ 
			username,
			password: bcrypt.hashSync(password, salt), //hash the password then add the randomizer as the second argument (salt)
		}).save();

		res.status(201).json({ //send back information about the user. 201 stands for the created http status. 
			response: {
				userId: newUser._id,
				username: newUser.username,
				accessToken: newUser.accessToken,
			},
			success: true,
		});
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.post('/signin', async (req, res) => { //send username & password and request to the body
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({ 
				response: {
					userId: user._id,
					username: user.username,
					accessToken: user.accessToken,
				},
				success: true,
			});
		} else {
			res.status(404).json({
				response: "Username or password doesn't match",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
