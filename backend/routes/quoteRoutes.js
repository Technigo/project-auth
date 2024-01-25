import express from "express"
import { QuoteModel } from "../models/quoteModel.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import asyncHandler from "express-async-handler"

const router = express.Router();

router.get(
    "/getQuote",
    authenticateUser,
    asyncHandler(async (req, res) => {
        try {
            const quotes = await QuoteModel.find();
            if (quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                res.json(randomQuote);
            } else {
                res.status(404).json({ error: "No quotes found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, response: error.message });
        }
    })
);


// Get all the quotes in the database
router.get(
    "/allQuotes", async (req, res) => {
        try {
            const quotes = await QuoteModel.find();
            res.json(quotes);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

router.post(
    "/addQuote", async (req, res) => {
        try {
            const { quote } = req.body.quote;
            const newQuote = new QuoteModel({ quote })

            await newQuote.save()
            res.json(newQuote)
        } catch (err) {
            res.status(404).json({ success: false, message: "Could not add quote" })
        }
    }
)

export default router