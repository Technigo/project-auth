import mongoose from "mongoose";
import crypto from "crypto"

const {Schema} = mongoose

export const userSchema = new Schema({
    name: {
        type: String, 
        unique: true 
    }, 
    userName: {
        type: String, 
        unique: true
    }, 
    password: {
        type: String, 
        require: true
    }, 
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex")
    }
})

export const UserModel = mongoose.model("User", userSchema)