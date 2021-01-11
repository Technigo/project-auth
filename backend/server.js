import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//nya importer
import mongoose from "mongoose";
import crypto from "crypto";
//import bcrypt from "bcrypt-nodejs";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth11jan";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//mongoose model for creating a user object
const User = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: [true, "A password is required."],
		minLength: 5,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
		unique: true,
	},
});

//Middleware, authenticate user. Checks access tokens in header of the request.
const authenticateUser = async (req, res, next) => {
	const user = await User.findOne({ accessToken: req.header("Authorization") });
	if (user) {
		req.user = user;
		next();
	} else {
		res.status(403).json({ loggedOut: true });
	}
};

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8081;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
	res.send("Hello world");
});

//endpoint with authentication. To protect the endpoint.
/*
app.get("/secrets", authenticateUser);
//new endpoint
app.get("/secrets", (req, res) => {
	res.json({ secret: "This is a secret" });
});
*/

//registration endpoint1
/*
app.post("/users", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = new User({
			username: username,
			password: bcrypt.hashSync(password),
		});
		user.save();
		res.status(201).json({ id: user._id, accessToken: user.accessToken });
	} catch (err) {
		res
			.status(400)
			.json({ message: "could not create user", errors: err.errors });
	}
});
*/
//Testar ett annat sätt att hantera fel

//Registration endpoint

app.post("/users", async (req, res) => {
	try {
		const { username, password } = req.body;
		const salt = bcrypt.genSaltSync(); //* everytime user is called  // Rainbow table attack -
		const user = await new User({
			username: username,
			password: bcrypt.hashSync(password, salt), //*
		}).save();

		res.status(201).json({ userId: user._id, accessToken: user.accessToken });
	} catch (err) {
		res.status(400).json({ message: "could not create user", errors: err });
	}
});
/*
app.post("/users", async (req, res) => {
	const { username, password } = req.body;
	const user = new User({
		username: username,
		//password: password,
		password: bcrypt.hashSync(password),
	});

	user.save(function (err) {
		if (err) {
			res.status(400).json({
				message: "could not create user",
				errors: err.errors,
				error: err,
			});
		} else {
			res.status(201).json({ id: user._id, accessToken: user.accessToken });
		}
	});
});
*/
//Login endpoint
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

	// Compile information that is access protected
	// And send it back to the client to use for that specific user
	res.status(201).json({ secretMessage });
});
