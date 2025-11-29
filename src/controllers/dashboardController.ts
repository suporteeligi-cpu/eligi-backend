import { Response, NextFunction } from "express";
import { dashboardService } from "../services/dashboardService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { businessService } from "../services/businessService";

class DashboardController {
  // 📌 1 — Gráficos de agendamentos (diário + mensal)
  async getAppointments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;

      // pega o business do dono
      const business = await businessService.getMyBusiness(ownerId);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      const chart = await dashboardService.getAppointmentsChart(business.id);

      return res.json(chart);

    } catch (err) {
      next(err);
    }
  }

  // 📌 2 — Estatísticas gerais (cards do dashboard)
  async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;

      const stats = await dashboardService.getStats(ownerId);

      return res.json(stats);

    } catch (err) {
      next(err);
    }
  }
}

export const dashboardController = new DashboardController();
