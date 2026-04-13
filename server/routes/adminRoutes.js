import express from 'express';
import {
  approveEvent,
  createAnnouncement,
  createCategory,
  getAdminDashboard,
  getAnnouncements,
  getCategories,
  getUsers,
  rejectEvent
} from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getAdminDashboard);
router.get('/users', getUsers);
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.put('/events/:id/approve', validateObjectId(), approveEvent);
router.put('/events/:id/reject', validateObjectId(), rejectEvent);

export default router;
