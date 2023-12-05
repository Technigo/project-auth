import mongoose from "mongoose";
import crypto from "crypto";

const { Schema } = mongoose;

export const advertiserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 5
        }, 
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true, 
            minlength: 6
        },
        accessToken: {
            type: String,
            default: () => crypto.randomBytes(128).toString("hex")
        }
    },
    {
        timestamps: true // if this is used, mongoose creates both createdAt and updatedAt
    }
);

export const AdvertiserModel = mongoose.model("advertiser", advertiserSchema);