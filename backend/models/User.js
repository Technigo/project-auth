// Import necessary modules
import mongoose from "mongoose";
import crypto from "crypto";

// Define user schema
const userSchema = new mongoose.Schema({
    // userName field is required and must be at least 5 characters long
    userName: {
        type: String,
        required: true,
        minlength: 5
    },
    // email field is required, must be unique
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // passwordHash field is required and must be at least 5 characters long
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
    // accessToken field is required, default value is a random 128-byte hex string
    accessToken: {
        type: String,
        required: true,
        default: () => crypto.randomBytes(128).toString("hex")
    }
});

// Create User model from user schema
const User = mongoose.model("User", userSchema);

// Export User model
export default User;