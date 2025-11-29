import prisma from "../utils/prisma";

export class AppointmentRepository {
  
  /**
   * Criar agendamento
   */
  async create(data: any) {
    return prisma.appointment.create({ data });
  }

  /**
   * Listagem com filtros + paginação + busca
   */
  async listFiltered(filters: {
    businessId: string;
    search?: string;
    status?: string;
    date?: string;
    professionalId?: string;
    skip: number;
    take: number;
  }) {
    const { businessId, search, status, date, professionalId, skip, take } = filters;

    const where: any = {
      businessId,
    };

    /**
     * 🔍 Filtro: busca (cliente, profissional, serviço)
     */
    if (search) {
      where.OR = [
        { clientName: { contains: search, mode: "insensitive" } },
        { professionalName: { contains: search, mode: "insensitive" } },
        { serviceName: { contains: search, mode: "insensitive" } },
      ];
    }

    /**
     * 📌 Filtro: status
     */
    if (status) {
      where.status = status;
    }

    /**
     * 📅 Filtro: data específica (yyyy-mm-dd)
     */
    if (date) {
      const start = new Date(`${date}T00:00:00`);
      const end = new Date(`${date}T23:59:59`);

      where.date = { gte: start, lte: end };
    }

    /**
     * 👤 Filtro: profissional
     */
    if (professionalId) {
      where.professionalId = professionalId;
    }

    /**
     * 🔢 Busca total para paginação
     */
    const totalItems = await prisma.appointment.count({ where });

    /**
     * 📌 Busca paginada + ordenada
     */
    const items = await prisma.appointment.findMany({
      where,
      orderBy: [{ date: "asc" }], // ordena por horário crescente
      skip,
      take,
    });

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / take),
      currentPage: skip / take + 1,
    };
  }

  /**
   * Buscar por ID
   */
  async findById(id: string) {
    return prisma.appointment.findUnique({ where: { id } });
  }

  /**
   * Atualizar por ID
   */
  async update(id: string, data: any) {
    return prisma.appointment.update({
      where: { id },
      data,
    });
  }

  /**
   * Excluir por ID
   */
  async delete(id: string) {
    return prisma.appointment.delete({ where: { id } });
  }

  /**
   * Dashboard: agendamentos do dia
   */
  async listToday(businessId: string, start: Date, end: Date) {
    return prisma.appointment.findMany({
      where: {
        businessId,
        date: { gte: start, lt: end },
      },
      orderBy: { date: "asc" },
    });
  }

  /**
   * Dashboard: contagem do dia
   */
  async countToday(businessId: string, start: Date, end: Date) {
    return prisma.appointment.count({
      where: {
        businessId,
        date: { gte: start, lt: end },
      },
    });
  }
}

export const appointmentRepository = new AppointmentRepository();
