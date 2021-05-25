/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';
import AppError from '../utils/appError';

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
};

export const authenticate = async (req, res, next) => {
  try {
    // check if there is a token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(new AppError(401, 'Unauthorized', 'Please Login'));
    }

    // verify the token
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return next(new AppError(401, 'Unauthorized', 'This user is no longer exist'));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
