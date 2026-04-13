import express from 'express';
import {
  createEvent,
  deleteEvent,
  getEventBySlug,
  getEvents,
  getFavoriteEvents,
  getFeaturedEvents,
  toggleFavorite,
  updateEvent
} from '../controllers/eventController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/featured/list', getFeaturedEvents);
router.get('/favorites/list', protect, getFavoriteEvents);
router.get('/:slug', getEventBySlug);
router.post('/', protect, authorize('admin', 'organizer'), upload.single('banner'), createEvent);
router.put('/:id', protect, validateObjectId(), upload.single('banner'), updateEvent);
router.delete('/:id', protect, validateObjectId(), deleteEvent);
router.post('/:id/favorite', protect, validateObjectId(), toggleFavorite);

export default router;
