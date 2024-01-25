import mongoose from "mongoose";

const { Schema } = mongoose;

export const quoteSchema = new Schema({
    quote: {
        type: String
    }
});

export const QuoteModel = mongoose.model('quote', quoteSchema)