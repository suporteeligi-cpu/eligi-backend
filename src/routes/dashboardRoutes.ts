import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get(
  "/appointments",
  authMiddleware,
  (req, res, next) => dashboardController.getAppointments(req, res, next)
);

export default router;
