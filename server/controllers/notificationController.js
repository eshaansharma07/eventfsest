import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ recipient: req.user._id }, { audience: 'all' }, { audience: `${req.user.role}s` }]
  }).sort({ createdAt: -1 });

  res.json({ success: true, notifications });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json({ success: true, notification });
});
