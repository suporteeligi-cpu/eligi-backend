import { dashboardRepository } from "../repositories/dashboardRepository";
import prisma from "../utils/prisma";
import { subDays, subMonths, startOfMonth } from "date-fns";

class DashboardService {
  // 📌 1. Gráfico diário (últimos 30 dias)
  async getDailyAppointments(businessId: string) {
    const startDate = subDays(new Date(), 30);

    const result = await prisma.appointment.groupBy({
      by: ["date"],
      where: {
        businessId,
        date: { gte: startDate },
      },
      _count: { id: true },
      orderBy: { date: "asc" },
    });

    return result.map((item) => ({
      date: item.date,
      count: item._count.id,
    }));
  }

  // 📌 2. Gráfico mensal (últimos 12 meses)
  async getMonthlyAppointments(businessId: string) {
    const startDate = subMonths(new Date(), 12);

    const result = await prisma.appointment.groupBy({
      by: ["month"],
      where: {
        businessId,
        month: { gte: startOfMonth(startDate) },
      },
      _count: { id: true },
      orderBy: { month: "asc" },
    });

    return result.map((item) => ({
      month: item.month,
      count: item._count.id,
    }));
  }

  // 📌 Gráficos final (retorna diário + mensal)
  async getAppointmentsChart(businessId: string) {
    const [daily, monthly] = await Promise.all([
      this.getDailyAppointments(businessId),
      this.getMonthlyAppointments(businessId),
    ]);

    return { daily, monthly };
  }

  // 📌 Estatísticas gerais (dashboardRepository)
  async getStats(ownerId: string) {
    return dashboardRepository.getStats(ownerId);
  }
}

export const dashboardService = new DashboardService();
