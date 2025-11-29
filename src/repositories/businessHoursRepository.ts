import prisma from "../utils/prisma";

export class BusinessHoursRepository {

  async getHours(businessId: string) {
    return prisma.businessHours.findMany({
      where: { businessId },
      orderBy: { dayOfWeek: "asc" }
    });
  }

  async saveHours(businessId: string, hours: any[]) {
    // apaga horários antigos
    await prisma.businessHours.deleteMany({ where: { businessId } });

    // recria do zero
    const data = hours.map((h) => ({
      businessId,
      dayOfWeek: h.dayOfWeek,
      openTime: h.isClosed ? null : h.openTime,
      closeTime: h.isClosed ? null : h.closeTime,
      isClosed: h.isClosed,
    }));

    return prisma.businessHours.createMany({
      data,
    });
  }
}

export const businessHoursRepository = new BusinessHoursRepository();
