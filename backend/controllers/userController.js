/* eslint-disable no-console */
import User from '../models/userModel.js';
import AppError from '../utils/appError';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const doc = await User.create({ name, email, password });
    
    doc.password = undefined;
    
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};