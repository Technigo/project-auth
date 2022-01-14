import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//Schema for user
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		trim: true,
	},
	username: {
		type: String,
		minlength: [5, 'You need at least 5 letters for your username'],
		unique: true,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		// Should not add a minlength bc the password will be encrypted
		required: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
});

//Model for creating user
const User = mongoose.model('User', UserSchema);

//Schema for secrets
const SecretSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
});

//Model for creating secret
const Secret = mongoose.model('Secret', SecretSchema);

//PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

//Middleware to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//A shield asking for accessToken
const authenticateUser = async (req, res, next) => {
	const accessToken = req.header('Authorization');
	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({ response: 'Please log in', success: false });
		}
	} catch (err) {
		res.status(400).json({ response: error, success: false });
	}
};

//--------------ENDPOINTS--------------

app.get('/', (req, res) => {
	res.send(
		'Hello world, welcome to our login app - see this API live at 👉:login-for-secrets.netlify.app'
	);
});

//--------------Authentication test--------------
app.get('/secrets', authenticateUser);
app.get('/secrets', async (req, res) => {
	const secrets = await Secret.find({});
	res.status(201).json({ response: secrets, success: true });
});

//--------------Post secrets--------------
app.post('/secrets', async (req, res) => {
	const { message } = req.body;

	try {
		const newSecret = await new Secret({ message }).save();
		res.status(201).json({ response: newSecret, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

//--------------Register--------------
app.post('/signup', async (req, res) => {
	const { name, email, username, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		//a conditon for creating a password
		if (password.length < 6 && username.length < 5) {
			//redirecting to catch
			throw 'Password must be at least 6 characters long and username must be longer than 5 characters';
		}

		const newUser = await new User({
			name,
			username,
			email,
			password: bcrypt.hashSync(password, salt),
		}).save();
		res.status(201).json({
			response: {
				userId: newUser._id,
				username: newUser.username,
				acccessToken: newUser.accessToken,
			},
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: error,
			success: false,
			message: 'New user could not be created',
		});
	}
});

//--------------Log in--------------
app.post('/signin', async (req, res) => {
	const { username, password } = req.body; //object destructuring
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
				response: 'User not found or password does not match',
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			success: false,
		});
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
