import prisma from "../utils/prisma";
import { startOfDay, endOfDay } from "date-fns";

export class DashboardRepository {
  async getStats(ownerId: string) {
    // achar o business do dono
    const business = await prisma.business.findUnique({
      where: { ownerId },
    });

    if (!business) return {
      appointmentsToday: 0,
      clientsToday: 0,
      estimatedRevenueToday: 0,
      activeProfessionals: 0,
    };

    const businessId = business.id;

    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    // AGENDAMENTOS DO DIA
    const appointmentsToday = await prisma.appointment.count({
      where: {
        businessId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    // CLIENTES ATENDIDOS (finalizados)
    const clientsToday = await prisma.appointment.count({
      where: {
        businessId,
        date: {
          gte: start,
          lte: end,
        },
        status: "completed",
      },
    });

    // RECEITA ESTIMADA
    const appointments = await prisma.appointment.findMany({
      where: {
        businessId,
        date: {
          gte: start,
          lte: end,
        },
      },
      include: { service: true },
    });

    const estimatedRevenueToday = appointments.reduce((sum, ap) => {
      return sum + (ap.service?.price || 0);
    }, 0);

    // PROFISSIONAIS ATIVOS
    const activeProfessionals = await prisma.businessTeam.count({
      where: {
        businessId,
        status: "active",
      },
    });

    return {
      appointmentsToday,
      clientsToday,
      estimatedRevenueToday,
      activeProfessionals,
    };
  }
}

export const dashboardRepository = new DashboardRepository();
