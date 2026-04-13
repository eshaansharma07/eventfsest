import express from 'express';
import {
  changePassword,
  forgotPassword,
  getProfile,
  loginUser,
  registerUser,
  resetPassword,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/signup', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
