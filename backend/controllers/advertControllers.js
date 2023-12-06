import { AdvertModel } from "../models/advert";
import { AdvertiserModel } from "../models/advertiser";
import asyncHandler from "express-async-handler";

export const getOwnAdvertsController = asyncHandler(async (req, res) => {
    try {
        // Extract accessToken from the request header key "Authorization"
        const accessToken = req.header("Authorization");

        // Find the user in the database that has the same accessToken
        const userFromStorage = await AdvertiserModel.findOne({ accessToken: accessToken});

        // Get all the adverts in the database that belong to the user
        const userAdverts = await AdvertModel.find({advertiser: userFromStorage}).sort({createdAt: -1});
        res.status(200).json(userAdverts);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export const addNewAdvertController = asyncHandler(async (req, res) => {
    try {
        // Extract the advert from the request body
        const { product, amount, unit, address, pickupTime } = req.body;

        // Extract accessToken from the request header key "Authorization"
        const accessToken = req.header("Authorization");

        // Find the user in the database that has the same accessToken
        const userFromStorage = await AdvertiserModel.findOne({ accessToken: accessToken});

        // Add the new advert to the database and attach the user to it
        const newAdvert = new AdvertModel({
            product: product,
            amount: amount,
            unit: unit,
            address: address,
            pickupTime: pickupTime,
            advertiser: userFromStorage
        });

        await newAdvert.save();

        // Return the new advert in a response
        res.status(201).json(newAdvert);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});