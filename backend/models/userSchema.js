import bcrypt from "bcrypt"
import mongoose from "mongoose";

const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
});

// Username, email?, encrypted password, role?

export const User = model("User", UserSchema);
