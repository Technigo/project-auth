import express from "express"
import bcrypt from "bcrypt-nodejs"

import User from "../models/SignUp" 

const router = express.Router()

router.post('/signup',(req,res)=>{
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    })
    newUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(400).json({message: "Please try again", errors: err.errors})
    })
})

module.exports = router