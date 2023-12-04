import express from "express"
const listEndPoints = require("express-list-endpoints")
import { UserModel } from "../models/User"
import bcrypt from "bcrypt-nodejs"

const router = express.Router()

// Start defining your routes here
router.get("/", (req, res) => {
    res.send("Hello Technigo!");
  });


router.post("/signup", async (req, res) => {
    try {
        //Successful login
        const {name, userName, password} = req.body //retrieving user information
        const user = new UserModel({name, userName, password: bcrypt.hashSync(password)})
        user.save() //saving new user 
        res.status(201).json({ id: user._id, accessToken: user.accessToken })
    } catch(err){
        res.status(400).json({ message: "Could not create user", errors: err.errors })
        //The error handling is not working correctly???
    }
})

router.post("/login", async(req, res) => {
    const user = await UserModel.findOne({userName: req.body.userName}) //getting the user from the database
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({userId: user._id, accessToken: user.accessToken}) 
    } else {
        res.json({notFound: true})
    }
})

export default router