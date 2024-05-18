import mongoose from "mongoose";

const {Schema} = mongoose;
const crypto = require("crypto");

export const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex")
    }
},
{timestamps: true})


export const UserModel = mongoose.model("users", userSchema);