import express from "express"
//const listEndPoints = require("express-list-endpoints")
import { UserModel } from "../models/User"
import bcrypt from "bcrypt-nodejs"
import listEndpoints from "express-list-endpoints"

const router = express.Router()


// TEST IDAH FRÅN VAN ca 20 min in i första klippet.
const authenticateUser = async (req, res, next) => {
    const user = await UserModel.findOne({ accessToken: req.header('Authorization') })
    //If user found. Next-function makes API go further
    if (user) {
        req.user = user
        next()
        //If user not found
    } else {
        res.status(401).json({ loggedOut: true })
    }
}

// -------- Routes starts here -------- //

// Endpoint: GET "/"
// Provides API documentation by listing all available endpoints using express-list-endpoints
router.get("/", (req, res) => {
    const documentation = {
        endpoints: listEndpoints(router),
    }
    res.json(documentation)
})

// Endpoint: POST "/signup"
// Handles user signup. Password is hashed using bcrypt for security.
router.post("/signup", async (req, res) => {
    try {
        // Successful login
        const { name, userName, password } = req.body //retrieving user information
        const user = new UserModel({ name, userName, password: bcrypt.hashSync(password) })
        user.save() //saving new user 
        res.status(201).json({ id: user._id, accessToken: user.accessToken })
    } catch (err) {
        // Login failed
        res.status(400).json({ message: "Could not create user", errors: err.errors })
        //**** The error handling is not working correctly??? ****
    }
})

// Endpoint: POST "/login"
// Handles user login by checking credentials agains the database. 
// Returns user details and access token on successful login; otherwise, returns a notFound status.
router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ userName: req.body.userName });

        if (user) {
            const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

            if (passwordMatch) {
                res.json({ userId: user._id, accessToken: user.accessToken });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// TEST IDAH FRÅN VAN ca 20 min in. Instructions: An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.

// Endpoint: GET "/starter"
// An authenticated endpoint which only returns content if the 'Authorization' header with the user's token was correct (will only happen if the next() function is called from the middleware)
router.get('/starter', authenticateUser)
// Route handler for the authenticated endpoint
router.get('/starter', async (req, res) => {
    //Successful request
    res.json({ secret: "Super secret starter page!" })

    //Error handling: 

})

export default router