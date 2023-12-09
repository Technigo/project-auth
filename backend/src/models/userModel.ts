import * as crypto from "crypto";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userShema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email is required"],
    },
    password: { type: String, require: true, minlength: 8 },
    accessToken: { type: String, default: () => crypto.randomBytes(128).toString("hex") },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userShema);

module.exports = User;
