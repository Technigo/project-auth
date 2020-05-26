import mongoose from 'mongoose'
import crypto from 'crypto'

export const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 12
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})