import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { AppError } from '../utils/AppError.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { sendEmail } from '../utils/sendEmail.js';

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  bio: user.bio,
  phone: user.phone,
  institution: user.institution,
  department: user.department,
  favorites: user.favorites
});

const buildAuthResponse = (user) => ({
  success: true,
  token: generateToken({ id: user._id, role: user.role }),
  user: sanitizeUser(user)
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, institution, department } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists with this email', 400);
  }

  const uploaded = await uploadToCloudinary(req.file, 'eventsphere/users');

  const user = await User.create({
    name,
    email,
    password,
    role,
    institution,
    department,
    avatar: uploaded?.secure_url
  });

  res.status(201).json(buildAuthResponse(user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  res.json(buildAuthResponse(user));
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const uploaded = await uploadToCloudinary(req.file, 'eventsphere/users');

  user.name = req.body.name || user.name;
  user.bio = req.body.bio || user.bio;
  user.phone = req.body.phone || user.phone;
  user.institution = req.body.institution || user.institution;
  user.department = req.body.department || user.department;
  user.avatar = uploaded?.secure_url || user.avatar;

  const updated = await user.save();
  res.json({ success: true, user: sanitizeUser(updated) });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!(await user.matchPassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400);
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Password updated successfully' });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('No user found with that email', 404);
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: 'EventSphere password reset',
    html: `<p>Reset your password using this link:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    text: `Reset your password using this link: ${resetLink}`
  });

  res.json({ success: true, message: 'Password reset email sent' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) {
    throw new AppError('Token is invalid or expired', 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: 'Password has been reset' });
});
