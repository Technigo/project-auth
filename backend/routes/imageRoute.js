import { ImageModel } from "../models/ImageModel";
import express from "express";
//import { authenticateUser } from "../middlewares/authenticateUser";

// Create an instance of the Express router
const router = express.Router();

//GET 
router.get("/getimage", (req, res) => {
    try {
        ImageModel.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({error})
        })
    } catch (error) {
        res.json({ error })
    }
})


router.post("/imageupload", async (req, res) => {
    console.log("Request body:", req.body); // Debugging

    try {
        const { imageData } = req.body;

        if (!imageData) {
            return res.status(400).json({ error: 'Required data missing.' });
        }

        const newImage = await ImageModel.create({ imageData });
        await newImage.save();
        res.status(201).json({ message: "Image successfully uploaded" });
    } catch (error) {
        console.error(error); // Log the detailed error
        res.status(409).json({ message: error.message });
    }
});



// Export the router for use in the main application
export default router;