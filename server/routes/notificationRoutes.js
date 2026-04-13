import express from 'express';
import { getNotifications, markNotificationRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.use(protect);
router.get('/', getNotifications);
router.put('/:id/read', validateObjectId(), markNotificationRead);

export default router;
