import { Response, NextFunction } from "express";
import { businessHoursService } from "../services/businessHoursService";
import { AuthRequest } from "../middlewares/authMiddleware";

export class BusinessHoursController {

  async getHours(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const data = await businessHoursService.getHours(ownerId);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async saveHours(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const { hours } = req.body;

      const saved = await businessHoursService.saveHours(ownerId, hours);

      res.status(200).json(saved);
    } catch (err) {
      next(err);
    }
  }
}

export const businessHoursController = new BusinessHoursController();
