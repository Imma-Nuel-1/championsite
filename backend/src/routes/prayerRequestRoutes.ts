import express from 'express';
import { sendPrayerRequest } from '../controllers/prayerRequestController';

const router = express.Router();

// POST route to handle prayer requests
router.post('/', sendPrayerRequest);

export default router;
