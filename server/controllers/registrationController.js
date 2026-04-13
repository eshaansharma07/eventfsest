import asyncHandler from 'express-async-handler';
import { stringify } from 'csv-stringify/sync';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import Waitlist from '../models/Waitlist.js';
import Ticket from '../models/Ticket.js';
import Review from '../models/Review.js';
import { AppError } from '../utils/AppError.js';
import { generateQRCodeDataUrl } from '../utils/qr.js';

const createTicketCode = () => `EVS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new AppError('Event not found', 404);

  const existing = await Registration.findOne({ event: event._id, participant: req.user._id });
  if (existing) throw new AppError('You already registered for this event', 400);

  if (event.registeredCount >= event.capacity) {
    const waitlistItem = await Waitlist.findOneAndUpdate(
      { event: event._id, user: req.user._id },
      { event: event._id, user: req.user._id },
      { upsert: true, new: true }
    );

    event.waitlistCount = await Waitlist.countDocuments({ event: event._id });
    await event.save();

    res.status(201).json({
      success: true,
      waitlisted: true,
      waitlist: waitlistItem,
      message: 'Event is full. You have been added to the waitlist.'
    });
    return;
  }

  const ticketCode = createTicketCode();
  const qrCode = await generateQRCodeDataUrl(JSON.stringify({ ticketCode, eventId: event._id, userId: req.user._id }));
  const registration = await Registration.create({
    event: event._id,
    participant: req.user._id,
    ticketCode,
    qrCode,
    paymentStatus: event.price > 0 ? 'paid' : 'free'
  });

  await Ticket.create({
    registration: registration._id,
    qrCode
  });

  event.registeredCount += 1;
  await event.save();

  const populated = await Registration.findById(registration._id)
    .populate('event')
    .populate('participant', 'name email avatar');

  res.status(201).json({ success: true, registration: populated });
});

export const cancelRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findOne({
    event: req.params.id,
    participant: req.user._id
  });

  if (!registration) throw new AppError('Registration not found', 404);

  registration.status = 'cancelled';
  await registration.save();

  const event = await Event.findById(req.params.id);
  event.registeredCount = Math.max(0, event.registeredCount - 1);
  await event.save();

  res.json({ success: true, message: 'Registration cancelled successfully' });
});

export const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ participant: req.user._id })
    .populate({
      path: 'event',
      populate: [
        { path: 'category', select: 'name color slug' },
        { path: 'organizer', select: 'name email avatar' }
      ]
    })
    .sort({ createdAt: -1 });

  res.json({ success: true, registrations });
});

export const checkInAttendee = asyncHandler(async (req, res) => {
  const registration = await Registration.findOne({ ticketCode: req.body.ticketCode }).populate('event');
  if (!registration) throw new AppError('Ticket not found', 404);

  registration.status = 'attended';
  registration.checkedInAt = new Date();
  await registration.save();

  res.json({ success: true, registration, message: 'Attendee checked in successfully' });
});

export const getParticipantsByEvent = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ event: req.params.id })
    .populate('participant', 'name email avatar institution department')
    .sort({ createdAt: -1 });

  res.json({ success: true, registrations });
});

export const exportParticipantsCsv = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ event: req.params.id })
    .populate('participant', 'name email institution department')
    .lean();

  const csv = stringify(
    registrations.map((registration) => ({
      name: registration.participant?.name,
      email: registration.participant?.email,
      institution: registration.participant?.institution,
      department: registration.participant?.department,
      status: registration.status,
      ticketCode: registration.ticketCode
    })),
    { header: true }
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="participants.csv"');
  res.send(csv);
});

export const addReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    event: req.params.id,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment
  });

  const populated = await Review.findById(review._id).populate('user', 'name avatar');
  res.status(201).json({ success: true, review: populated });
});
