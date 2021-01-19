import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl =
	process.env.MONGO_URL ||
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.qxpka.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = Promise;

// Schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [5, "Password must be at least 5 characters"],
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
		unique: true,
	},
});

// Middleware to hash password before new user is saved
userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) {
		return next();
	}

	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});

//mongoose model for creating a user object
const User = mongoose.model("User", userSchema);

// Middleware, authenticate user. Checks access tokens in header of the request.
const authenticateUser = async (req, res, next) => {
	const user = await User.findOne({ accessToken: req.header("Authorization") });
	if (user) {
		req.user = user;
		next();
	} else {
		res.status(403).json({ loggedOut: true });
	}
};

// PORT=9000 npm start
const port = process.env.PORT || 8081;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
	res.send("This is the secret endpoint API");
});

app.post("/users", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await new User({
			username,
			password,
		}).save();

		res.status(201).json({ userId: user._id, accessToken: user.accessToken });
	} catch (err) {
		res.status(400).json({ message: "could not create user", errors: err });
	}
});

// Login endpoint
app.post("/session", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			res.status(200).json({
				userFound: true,
				userId: user._id,
				accessToken: user.accessToken,
			});
		} else {
			res.status(400);
			res.json({
				userFound: false,
				message: "Login failed, please try again.",
			});
		}
	} catch (err) {
		res
			.status(400)
			.json({ message: "Login failed, please try again.", errors: err });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

// SECURE ENDPOINT WHICH USER NEED TO LOGIN TO ACCESS
app.get("/secret", authenticateUser);
app.get("/secret", (req, res) => {
	const secretMessage = {
		imageUrl: `https://i.pinimg.com/originals/52/c6/ef/52c6ef702fa46b05607bb468244338be.jpg`,
	};

	res.status(201).json({ secretMessage });
});
