import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Category from '../models/Category.js';
import Notification from '../models/Notification.js';
import Registration from '../models/Registration.js';

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const [users, events, registrations, pendingEvents, featuredEvents, userGrowth, organizerPerformance] =
    await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Registration.countDocuments(),
      Event.countDocuments({ approved: false }),
      Event.countDocuments({ featured: true }),
      User.aggregate([
        {
          $group: {
            _id: { $month: '$createdAt' },
            total: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Event.aggregate([
        {
          $group: {
            _id: '$organizer',
            eventsCreated: { $sum: 1 },
            registrations: { $sum: '$registeredCount' }
          }
        },
        { $sort: { registrations: -1 } },
        { $limit: 5 }
      ])
    ]);

  res.json({
    success: true,
    metrics: {
      users,
      events,
      registrations,
      pendingEvents,
      featuredEvents
    },
    userGrowth,
    organizerPerformance
  });
});

export const approveEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { approved: true, status: 'upcoming' },
    { new: true }
  );

  res.json({ success: true, event });
});

export const rejectEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { approved: false, status: 'draft' },
    { new: true }
  );

  res.json({ success: true, event });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, users });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
});

export const getAnnouncements = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ type: 'announcement' }).sort({ createdAt: -1 });
  res.json({ success: true, notifications });
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const notification = await Notification.create({
    ...req.body,
    type: 'announcement'
  });

  res.status(201).json({ success: true, notification });
});
