import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    certificateId: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);
