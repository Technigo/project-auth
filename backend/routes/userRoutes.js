import listEndpoints from "express-list-endpoints";
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = express.Router();

// Start defining your routes here
router.get("/", (_, res) => {
    res.json(listEndpoints(router));
});

router.post("/register", async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        const userAlreadyExists = await User.exists({ email });
        if (userAlreadyExists !== null) {
            res.status(400).json({ message: "Could not register" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ email, userName, passwordHash });

        res.status(201).json({ email: user.email, userName: user.userName, accessToken: "Test" });
    } catch (error) {
        res.status(400).json({ message: "Could not register" });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const hasCorrectPassword = await bcrypt.compare(password, user.passwordHash);
        if (hasCorrectPassword) {
            res.status(200).json({ email: user.email, userName: user.userName, accessToken: "Test" });
        } else {
            res.status(401).json({ message: "Could not sign in" });
        }
        // We return the same status and error message as when the password
        // is incorrect so that a potential attacker can't figure out 
        // if it is the email or the password that is wrong.
    } else {
        res.status(401).json({ message: "Could not sign in" });
    }
})

export default router;
