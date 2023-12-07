import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
    accessToken: {
        type: String,
        required: true,
        default: () => crypto.randomBytes(128).toString("hex")
    }
});

const User = mongoose.model("User", userSchema);

export default User;