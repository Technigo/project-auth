import crypto from "crypto";
import mongoose from "mongoose";

// Destructuring 'Schema' from mongoose
const { Schema } = mongoose;

export const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"), // Generate a random 128 byte hex string for the access token
  },
});
export const UserModel = mongoose.model("user", userSchema);
