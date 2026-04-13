import mongoose from 'mongoose';
import { EVENT_MODES, EVENT_STATUSES } from '../utils/constants.js';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    banner: String,
    gallery: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [String],
    venue: { type: String, required: true },
    meetingLink: String,
    mode: { type: String, enum: EVENT_MODES, default: 'offline' },
    capacity: { type: Number, required: true },
    registeredCount: { type: Number, default: 0 },
    waitlistCount: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    status: { type: String, enum: EVENT_STATUSES, default: 'pending' },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sponsors: [String],
    agenda: [
      {
        time: String,
        title: String,
        speaker: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
