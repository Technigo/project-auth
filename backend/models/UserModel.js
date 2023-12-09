// Make it easy to make schemas and connect to mongodb.
import mongoose from "mongoose";

// Imports the Node.js crypto library for generating secure random strings.
import crypto from "crypto";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
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
      default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
