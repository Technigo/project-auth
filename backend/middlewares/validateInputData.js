import { AdModel } from "../models/AdModel";

// Middleware function for validating ad data
export const validateInputData = (req, res, next) => {
    const { brand, imageUrl, size, model, price } = req.body;

    // Validate the incoming data against the schema
    const newAd = new AdModel({
        brand,
        imageUrl,
        size,
        model,
        price,
        user: req.user._id, // Assuming you have the user ID in the request object after authentication
    });

    // Validate the ad data synchronously
    const validationError = newAd.validateSync();

    if (validationError) {
        return res.status(400).json({ error: validationError.message }); // Send validation error
    }

    req.newAd = newAd; // Attach validated ad object to the request
    next(); // Move to the next middleware or route handler
};