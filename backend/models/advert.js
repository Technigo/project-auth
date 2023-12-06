import mongoose from "mongoose";

const { Schema } = mongoose;

export const advertSchema = new Schema({
    product: {
        type: String,
        required: true
    }, 
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pickupTime: {
        type: Date,
        default: Date.now
    },
    advertiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertiser"
    }
},
{
    timestamps: true,
});

export const AdvertModel = mongoose.model("Advert", advertSchema);