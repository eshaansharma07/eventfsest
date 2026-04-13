import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Waitlist', waitlistSchema);
