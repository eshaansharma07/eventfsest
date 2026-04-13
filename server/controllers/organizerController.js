import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import Notification from '../models/Notification.js';

export const getOrganizerDashboard = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizer: req.user._id }).sort({ startsAt: 1 });
  const eventIds = events.map((event) => event._id);

  const [registrations, attendance, revenue, notifications] = await Promise.all([
    Registration.countDocuments({ event: { $in: eventIds } }),
    Registration.countDocuments({ event: { $in: eventIds }, status: 'attended' }),
    Event.aggregate([
      { $match: { organizer: req.user._id } },
      {
        $group: {
          _id: null,
          revenue: { $sum: { $multiply: ['$price', '$registeredCount'] } }
        }
      }
    ]),
    Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(10)
  ]);

  res.json({
    success: true,
    metrics: {
      totalEvents: events.length,
      registrations,
      attendance,
      revenue: revenue[0]?.revenue || 0
    },
    events,
    notifications
  });
});

export const createOrganizerAnnouncement = asyncHandler(async (req, res) => {
  const notification = await Notification.create({
    title: req.body.title,
    message: req.body.message,
    audience: 'participants',
    type: 'announcement',
    event: req.body.eventId
  });

  res.status(201).json({ success: true, notification });
});
