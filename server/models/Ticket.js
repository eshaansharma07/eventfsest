import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    registration: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
    pdfUrl: String,
    qrCode: String,
    downloadedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Ticket', ticketSchema);
