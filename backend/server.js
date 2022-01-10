import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
    username: {
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
        required: true,
        default: () => crypto.randomBytes(128).toString("hex"),
    },
});

const User = mongoose.model("User", UserSchema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
    const { accessToken } = req.header("Authorization");
    try {
        const user = await User.findOne({ accessToken });
        if (user) {
            req.user = user
            next();
        } else {
            res.status(401).json({ response: "Please log in", success: false });
        }
    } catch (error) {
        res.status(400).json({
            response: error,
            success: false,
        });
    }
};

// authenticate on an endpoint
// app.get("/", authenticateUser)

// Start defining your routes here
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = bcrypt.genSaltSync();

        if (password.length < 5) {
            throw "Password must be longer than 5 characters";
        }

        const newUser = await new User({
            username,
            password: bcrypt.hashSync(password, salt),
        }).save();

        res.status(201).json({
            response: {
                userId: newUser._id,
                username: newUser.username,
                accessToken: newUser.accessToken,
            },
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            response: "something happened",
            success: false,
        });
    }
});

app.post("/signin", async (req, res) => {
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
                response: "user not found/password doesn't match",
                success: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            response: "something else happened",
            success: false,
        });
    }
});

// Start the server
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on http://localhost:${port}`);
});
