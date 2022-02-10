import express from 'express';
import { createNewSchedule, createNewUser, login } from '../controller';
import { verifyToken } from '../middleware';
import cronJobSchedule from '../services/cronSchedule';

const router = express.Router();
router.post('/api/v1/create-user', createNewUser);
router.post('/api/v1/login', login);
router.post('/api/v1/create-schedule', verifyToken, createNewSchedule, cronJobSchedule);
export default router;
