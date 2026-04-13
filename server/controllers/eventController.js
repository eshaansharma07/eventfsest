import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Category from '../models/Category.js';
import Registration from '../models/Registration.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { slugify } from '../utils/slugify.js';

const populateEvent = [
  { path: 'category', select: 'name color slug icon' },
  { path: 'organizer', select: 'name email avatar institution role' }
];

export const getEvents = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.status) query.status = req.query.status;
  if (req.query.featured) query.featured = req.query.featured === 'true';
  if (req.query.approved) query.approved = req.query.approved === 'true';
  if (req.query.category) query.category = req.query.category;
  if (req.query.organizer) query.organizer = req.query.organizer;
  if (req.query.search) query.title = { $regex: req.query.search, $options: 'i' };

  const events = await Event.find(query)
    .populate(populateEvent)
    .sort({ startsAt: 1 });

  res.json({ success: true, events });
});

export const getFeaturedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ featured: true, approved: true })
    .populate(populateEvent)
    .limit(6)
    .sort({ startsAt: 1 });

  res.json({ success: true, events });
});

export const getEventBySlug = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug }).populate(populateEvent);
  if (!event) throw new AppError('Event not found', 404);

  const [reviews, registrations] = await Promise.all([
    Review.find({ event: event._id }).populate('user', 'name avatar'),
    Registration.find({ event: event._id }).populate('participant', 'name email avatar institution')
  ]);

  res.json({ success: true, event, reviews, registrations });
});

export const createEvent = asyncHandler(async (req, res) => {
  const bannerUpload = await uploadToCloudinary(req.file, 'eventsphere/events');

  const category = await Category.findById(req.body.category);
  if (!category) throw new AppError('Invalid category', 400);

  const baseSlug = slugify(req.body.title);
  const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

  const event = await Event.create({
    ...req.body,
    tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    sponsors: req.body.sponsors ? JSON.parse(req.body.sponsors) : [],
    agenda: req.body.agenda ? JSON.parse(req.body.agenda) : [],
    banner: bannerUpload?.secure_url,
    slug,
    organizer: req.user._id,
    approved: req.user.role === 'admin',
    status: req.user.role === 'admin' ? 'upcoming' : 'pending'
  });

  const populated = await Event.findById(event._id).populate(populateEvent);
  res.status(201).json({ success: true, event: populated });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new AppError('Event not found', 404);

  const canEdit = req.user.role === 'admin' || event.organizer.toString() === req.user._id.toString();
  if (!canEdit) throw new AppError('Not allowed to edit this event', 403);

  const bannerUpload = await uploadToCloudinary(req.file, 'eventsphere/events');
  const fields = ['title', 'description', 'shortDescription', 'venue', 'meetingLink', 'mode', 'capacity', 'price', 'featured', 'status', 'startsAt', 'endsAt', 'registrationDeadline', 'category'];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      event[field] = req.body[field];
    }
  });

  if (req.body.tags) event.tags = JSON.parse(req.body.tags);
  if (req.body.sponsors) event.sponsors = JSON.parse(req.body.sponsors);
  if (req.body.agenda) event.agenda = JSON.parse(req.body.agenda);
  if (bannerUpload?.secure_url) event.banner = bannerUpload.secure_url;

  if (req.user.role !== 'admin') {
    event.approved = false;
    if (event.status !== 'completed') event.status = 'pending';
  }

  await event.save();
  const populated = await Event.findById(event._id).populate(populateEvent);

  res.json({ success: true, event: populated });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new AppError('Event not found', 404);

  const canDelete = req.user.role === 'admin' || event.organizer.toString() === req.user._id.toString();
  if (!canDelete) throw new AppError('Not allowed to delete this event', 403);

  await event.deleteOne();
  res.json({ success: true, message: 'Event deleted successfully' });
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const eventId = req.params.id;
  const alreadySaved = user.favorites.some((favorite) => favorite.toString() === eventId);

  user.favorites = alreadySaved
    ? user.favorites.filter((favorite) => favorite.toString() !== eventId)
    : [...user.favorites, eventId];

  await user.save();

  res.json({ success: true, favorites: user.favorites });
});

export const getFavoriteEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'favorites',
    populate: populateEvent
  });

  res.json({ success: true, events: user.favorites });
});
