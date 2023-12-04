import express from "express";
import { User } from "../models/userModel";
import { authenticateUser } from "../middleware/authenticateUser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// Defines the router and makes it available to other files
export const userRouter = express();

// Creates a route for creating a user
userRouter.post("/register", asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        // First check if the username already exists in the database
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User already exists, try logging in instead!" }) // Checks if the user already exists, if so, it will return an error
        }

        // Then check if any fields are left empty
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill out all fields." }) // Checks if the username or password is missing, if so, it will return an error
        }

        const hashedPassword = bcrypt.hashSync(password, 10); // Encrypts the password, so that no plaintext passwords are stored in the database
        // If all checks pass, the user will be created
        const user = new User({
            username,
            password: hashedPassword // Adds the encrypted password as the password in the user object
        });

        await user.save();

        res.status(201).json({
            success: true,
            response: {
                id: user._id,
                username: user.username,
                accessToken: user.accessToken
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                response: {
                    message: "Username already exists. Please choose another username.",
                    errors: err
                }
            });
        } else {
            // Handle other errors
            res.status(400).json({
                success: false,
                response: {
                    message: "Could not create user",
                    errors: err
                }
            });
        }
    }
}));

userRouter.post("/login", asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        // First check if there is no user with that name, then ask the user to register
        if (!user) {
            res.status(404).json({ message: "User not found, please register for an account" })
        }

        // Then check if the password is correct, if not, return an error
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Incorrect password" })
        } else {
            res.status(201).json({
                success: true,
                response: {
                    id: user._id,
                    username: user.username,
                    accessToken: user.accessToken
                }
            })
        }
    } catch (err) {
        { // Checks against the rules in the model, if any of them are broken, it will return an error
            res.status(400).json({
                success: false,
                response: {
                    message: "Could not log in user",
                    errors: err.errors
                }
            })
        }
    }
}));

// // Creates a route for sessions - showing logged in users. The information shown is the accessToken and the user id
// router.post("/sessions", asyncHandler(async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });

//     if (user && bcrypt.compareSync(req.body.password, user.password)) { // Compares the plaintext password from the request body with the encrypted password from the database
//         res.json({ userId: user._id, accessToken: user.accessToken }); // Returns the user id and access token if the passwords match
//     } else {
//         res.json({ notFound: true })
//     }
// }));

// Creates a route only reachable for logged in users, the middleware authenticateUser is used to check if the user is logged in
userRouter.get("/dashboard", authenticateUser, (req, res) => {
    const { username } = req.user; // gets the username from the authenticated user
    res.send(`Welcome to your Dashboard, ${username}!`);
});

userRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});