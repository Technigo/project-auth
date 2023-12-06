import mongoose from "mongoose";
import crypto from "crypto";

const { Schema } = mongoose;

//----- The User model -------//
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

export const UserModel = mongoose.model("User", userSchema);
