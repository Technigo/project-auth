import mongoose from "mongoose";
import bcrypt from "bcrypt";


const SALT_ROUNDS = 12; // make this configurable so we can adjust the security level if needed

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
  refreshToken: {
    type: String,
    default: null,
  },
});

//use matchPassword method to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
//add a pre-save hook to hash the password *before* saving it to the database so we don't store the password in plain text because we are mysterious and security conscious
userSchema.pre('save', async function(next) {
  // we only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }
  // hash the password before saving it to the database with the SALT_ROUNDS we can easoly adjust the security level.
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});



export default mongoose.model('User', userSchema);
