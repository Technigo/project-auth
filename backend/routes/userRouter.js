import express from "express";
import { User } from "../models/userModel";
import { authenticateUser } from "../middleware/authenticateUser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// Defines the router and makes it available to other files
export const router = express();

router.post("/users", asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10); // Encrypts the password, so that no plaintext passwords are stored in the database

        const user = new User({
            username,
            password: hashedPassword // Adds the encrypted password as the password in the user object
        });

        await user.save();

        res.status(201).json({
            id: user._id,
            accessToken: user.accessToken
        })
    } catch (err) {
        res.status(400).json({ message: "Could not create user", errors: err.errors }) // Checks against the rules in the model, if any of them are broken, it will return an error
    }
}));

router.get("/secrets", authenticateUser)
router.get("/secrets", (req, res) => {
    res.send({ secret: "This is a secret message" });
});

// Creates a route for sessions - showing logged in users. The information shown is the accessToken and the user id
router.post("/sessions", asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) { // Compares the plaintext password from the request body with the encrypted password from the database
        res.json({ userId: user._id, accessToken: user.accessToken }); // Returns the user id and access token if the passwords match
    } else {
        res.json({ notFound: true })
    }
}));