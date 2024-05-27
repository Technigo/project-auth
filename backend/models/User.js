import mongoose from "mongoose"
import bcrypt from "bcrypt"

//Schema - the blueprint
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync()
  }
});

//Model
const User = model("User", userSchema)

export default User

