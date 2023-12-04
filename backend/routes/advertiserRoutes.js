import express from "express";
import { AdvertiserModel } from "../models/advertiser";
import listEndpoints from "express-list-endpoints";
import asyncHandler from "express-async-handler";
import { jwt } from "jsonwebtoken";

const router = express.Router();

const generateToken = (advertisement) => {
    return jwt.sign({ id: advertiser._id}, process.env.JWT_SECRET, {
        expires: "24h"
    });
}
// Endpoint to show documentation of all endpoints
router.get(
    "/", 
    asyncHandler(async (req, res) => {
        const endpoints = listEndpoints(router);
        res.json(endpoints);
    })
);

// USER REGISTRATION ROUTE
router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                res.status(400).json({message: "Please add all fields", error: err.errors});
            } else {
                const existingUser = AdvertiserModel.findOne({
                    $or: [{ username }, { email }]
                });
                
                if (existingUser) {
                    res.status(400).json({message: `User with ${existingUser.username = username ? "username" : "email"} already exists`})
                };

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                const newAdvertiser = new AdvertiserModel({
                    username,
                    email,
                    password: hashedPassword
                });

                await newAdvertiser.save();

                res.status(201).json ({
                    success: true,
                    response: {
                        username: newAdvertiser.username,
                        email: newAdvertiser.email,
                        id: newAdvertiser._id,
                        accessToken: generateToken(newAdvertiser._id)
                    }
                });
            };
        } catch (err) {
            res.status(500).json({ success: false, response: err.message });
        }
    })
)


export default router;