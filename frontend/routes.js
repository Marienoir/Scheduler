import express from 'express';
import { setSchedule } from './controller/scheduleController';
import { index, login, signup } from './controller/userController';
const router = express.Router();

router.get("/", index);
router.get("/signup", signup);
router.get("/login", login);
router.get("/schedule", setSchedule);

export default router;