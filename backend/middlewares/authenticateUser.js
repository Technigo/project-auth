//Checks and verifies requests, responses and next 
import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
    //retrieve the access token from the request header (why is it sometimes header and not body?)
    const accessToken = req.header("Authorization");
    console.log("Access Token:", accessToken);
    try {
        const user = await UserModel.findOne({ accessToken: accessToken });
        console.log("Retrieved User:", user);
        if (user) {
            req.user = user; // Store the user in the request for later use
            next(); //Continue to the next middleware route
        } else {
            //if user not found show message
            res.status(401).json({ success: false, response: "Please log in" });
        }
    } catch (e) {
        // handle erros that occur during the db query or authentication
        res.status(500).json({ success: false, response: e.message });
    }
};