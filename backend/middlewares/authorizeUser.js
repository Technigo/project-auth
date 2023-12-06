import { AdvertiserModel } from "../models/advertiser";

export const authorizeUser = async (req, res, next) => {
    // Extract the accessToken from the headers key "Authorization"
    const accessToken = req.header("Authorization");

    // Find the user in the database that has the same accessToken
    try {
        const user = await AdvertiserModel.findOne({accessToken: accessToken});

        // If that user exists, add the user object to the request object and hand over it to the next middleware or routes. Otherwise, return status 401 Unauthorized and message "Please log in".
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({ success: false, message: "Please log in" });
        };
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};