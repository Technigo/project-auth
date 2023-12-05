const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userShema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
  accessToken: { type: String, default: () => crypto.randomBytes(128).toString("hex") },
});

const User = mongoose.model("User", userShema);

module.exports = User;
