import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['registered', 'cancelled', 'waitlisted', 'attended'],
      default: 'registered'
    },
    ticketCode: { type: String, required: true },
    qrCode: String,
    checkedInAt: Date,
    paymentStatus: {
      type: String,
      enum: ['free', 'paid', 'refunded'],
      default: 'free'
    }
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, participant: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);
