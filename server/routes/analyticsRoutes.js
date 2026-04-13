import express from 'express';
import { getPlatformAnalytics } from '../controllers/analyticsController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin', 'organizer'), getPlatformAnalytics);

export default router;
