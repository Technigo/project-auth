import mongoose from "mongoose";
import crypto from "crypto"; 

const { Schema } = mongoose; //destructures the Schema class from Mongoose to create a Schema

//Below Schema defines the structure of the user document in the MongoDB collection
export const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            minlength: 2, 
        },
        password: {
            type: String, 
            required: true, 
            minlength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        accessToken: {
            type: String,
            default: () => crypto.randomBytes(128).toString("hex"),
        },
    },
    // Add timestamp to tell when the user object is created 
    {
        timestamps: true, //always outside of the initial object you create in the schema
    }
);

export const UserModel = mongoose.model("User", userSchema);