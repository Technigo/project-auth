import { User } from "../models/userModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// Creates a route for creating a user
export const registerUserController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        username = username.toLowerCase(); // Converts the username to lowercase, so that the user can log in with both uppercase and lowercase letters

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

        return res.status(201).json({
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
            return res.status(400).json({
                success: false,
                response: {
                    message: "Could not create user",
                    errors: err
                }
            });
        }
    }
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        // First check if there is no user with that name, then ask the user to register
        if (!user) {
            return res.status(404).json({ message: "User not found, please register for an account" })
        }

        // Then check if the password is correct, if not, return an error
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" })
        } else {
            return res.status(201).json({
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
});

// Creates a route only reachable for logged in users, the middleware authenticateUser is used to check if the user is logged in
export const getDashboardController = (req, res) => {
    const { username } = req.user; // gets the username from the authenticated user
    try {
        res.send(`Welcome to your Dashboard, ${username}!`);
    } catch (err) {
        res.status(400).json({
            success: false,
            response: {
                errors: err.errors
            }
        })
    }
};

export const getUsersController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};