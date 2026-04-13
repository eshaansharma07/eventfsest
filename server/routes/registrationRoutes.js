import express from 'express';
import {
  addReview,
  cancelRegistration,
  checkInAttendee,
  exportParticipantsCsv,
  getMyRegistrations,
  getParticipantsByEvent,
  registerForEvent
} from '../controllers/registrationController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.get('/mine', protect, getMyRegistrations);
router.post('/check-in', protect, authorize('admin', 'organizer'), checkInAttendee);
router.post('/:id', protect, validateObjectId(), registerForEvent);
router.put('/:id/cancel', protect, validateObjectId(), cancelRegistration);
router.post('/:id/reviews', protect, validateObjectId(), addReview);
router.get('/event/:id', protect, authorize('admin', 'organizer'), validateObjectId(), getParticipantsByEvent);
router.get('/event/:id/export', protect, authorize('admin', 'organizer'), validateObjectId(), exportParticipantsCsv);

export default router;
