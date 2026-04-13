import express from 'express';
import { getLandingData } from '../controllers/publicController.js';

const router = express.Router();

router.get('/landing', getLandingData);

export default router;
