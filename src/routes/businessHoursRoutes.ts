import { Router } from "express";
import { businessHoursController } from "../controllers/businessHoursController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, (req, res, next) =>
  businessHoursController.getHours(req, res, next)
);

router.post("/", authMiddleware, (req, res, next) =>
  businessHoursController.saveHours(req, res, next)
);

export default router;
