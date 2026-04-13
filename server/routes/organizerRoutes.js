import express from 'express';
import { getOrganizerDashboard, createOrganizerAnnouncement } from '../controllers/organizerController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('organizer', 'admin'));

router.get('/dashboard', getOrganizerDashboard);
router.post('/announcements', createOrganizerAnnouncement);

export default router;
