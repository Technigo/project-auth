import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Create a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [30, "Name must be at most 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters"],
  },
  role: {
    type: String,
    enum: ["user", "writer", "editor", "admin"],
    default: "user",
  },
  accessToken: {
    type: String,
    default: () => {
      return bcrypt.hashSync(Math.random().toString(36).substring(2), 10);
    },
  },
});

// Create a model
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
