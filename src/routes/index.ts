import { Router } from 'express';
import authRoutes from './authRoutes';
import businessRoutes from './businessRoutes';
import teamRoutes from "./teamRoutes";
import appointmentRoutes from "./appointmentRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/business', businessRoutes);
router.use("/team", teamRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
