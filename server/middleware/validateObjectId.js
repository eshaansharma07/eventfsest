import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';

export const validateObjectId = (paramName = 'id') => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    throw new AppError('Invalid resource id', 400);
  }

  next();
};
