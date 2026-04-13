import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Event from '../models/Event.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';

export const getLandingData = asyncHandler(async (req, res) => {
  const [featuredEvents, trendingEvents, categories, testimonials, announcements] = await Promise.all([
    Event.find({ featured: true, approved: true }).populate('category organizer').limit(6).sort({ startsAt: 1 }),
    Event.find({ approved: true }).populate('category organizer').sort({ registeredCount: -1 }).limit(6),
    Category.find().sort({ name: 1 }),
    Review.find().populate('user', 'name avatar').limit(6).sort({ createdAt: -1 }),
    Notification.find({ type: 'announcement' }).sort({ createdAt: -1 }).limit(5)
  ]);

  res.json({
    success: true,
    featuredEvents,
    trendingEvents,
    categories,
    testimonials,
    announcements
  });
});
