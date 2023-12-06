import mongoose from "mongoose";
import crypto from "crypto"; 

const { Schema } = mongoose; //destructures the Schema class from Mongoose to create a Schema

//Below Schema defines the structure of the user document in the MongoDB collection
export const userSchema = new Schema(
    {
        // Define the 'username' field with a String data type
        username: {
            type: String, // Specifies that 'username' should be a string
            required: true, // Indicates that 'username' is a required field
            unique: true, // Ensures that 'username' values are unique
            minlength: 2, // Sets a minimum length of 2 characters for 'username'
        },
        // Define the 'password' field with a String data type
        password: {
            type: String, // Specifies that 'password' should be a string
            required: true, // Indicates that 'password' is a required field
            minlength: 6, // Sets a minimum length of 6 characters for 'password'
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        //Define the 'accessToken' field with a String data type
        accessToken: {
            type: String, // Specifies that 'accessToken' should be a string
            default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model("User", userSchema);