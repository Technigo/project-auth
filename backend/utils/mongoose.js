import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

export const User = mongoose.model('User', UserSchema);

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  hearts: {
    type: Number,
    default: 0,
  },
});

export const Thought = mongoose.model('Thought', ThoughtSchema);
