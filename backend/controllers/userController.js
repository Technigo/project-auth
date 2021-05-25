/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import User from '../models/userModel.js';
import { createToken } from './authController';
import AppError from '../utils/appError';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      id: user._id,
      accessToken: createToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};
