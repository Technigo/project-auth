import mongoose from "mongoose";
import crypto from "crypto";

const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlenght: 2
    },
    password: {
        type: String,
        required: true,
        minlenght: 6

    },
    emaill: {
        type: String,
        required: true,
        unique: true,
      
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex")
    }
},
{
    timestamps: true
}
)

export const UserModel = mongoose.model('User', userSchema);