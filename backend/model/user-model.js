import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Create a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
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
