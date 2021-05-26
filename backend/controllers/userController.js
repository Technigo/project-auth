/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import User from '../models/userModel.js';
import { createToken } from './authController';
import AppError from '../utils/appError';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    // remove the password from the return value
    user.password = undefined;

    // returns the entire user except for the password
    res.status(201).json({
      user,
      accessToken: createToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(
        new AppError(401, 'Unauthorized', 'The email and/or password is incorrect')
      );
    }

    // remove the password from the return value
    user.password = undefined;

    // returns the entire user except for the password
    res.status(200).json({
      user,
      accessToken: createToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};
