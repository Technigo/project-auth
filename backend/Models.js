import mongoose from 'mongoose'
import crypto from 'crypto'

export const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})