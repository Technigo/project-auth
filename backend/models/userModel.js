import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    unique: [true, 'The user is already taken, please try something else']
  },
  email: {
    type: String,
    unique: [true, 'That email is already taken, please try something else']
  },
  password: {
    type: String,
    required: [true, 'You need to provide a password'],
    select: false
  }
});

// encrypt the password using 'bcryptjs'
userSchema.pre('save', async function () {
  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);
});

// create a custom method for the user instance
userSchema.methods.comparePassword = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword)
}

export default mongoose.model('User', userSchema);
