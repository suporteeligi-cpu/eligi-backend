import { appointmentRepository } from "../repositories/appointmentRepository";
import { businessRepository } from "../repositories/businessRepository";

export class AppointmentService {

  async create(ownerId: string, data: any) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    return appointmentRepository.create({
      ...data,
      businessId: business.id,
    });
  }

  async listFiltered(
    ownerId: string,
    filters: {
      search?: string;
      status?: string;
      date?: string;
      professionalId?: string;
      page: number;
      limit: number;
    }
  ) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    const skip = (filters.page - 1) * filters.limit;
    const take = filters.limit;

    return appointmentRepository.listFiltered({
      businessId: business.id,
      search: filters.search,
      status: filters.status,
      date: filters.date,
      professionalId: filters.professionalId,
      skip,
      take,
    });
  }

  async update(ownerId: string, id: string, data: any) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    const appointment = await appointmentRepository.findById(id);
    if (!appointment || appointment.businessId !== business.id)
      throw new Error("Appointment not found");

    return appointmentRepository.update(id, data);
  }

  async delete(ownerId: string, id: string) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    const appointment = await appointmentRepository.findById(id);
    if (!appointment || appointment.businessId !== business.id)
      throw new Error("Appointment not found");

    return appointmentRepository.delete(id);
  }
}

export const appointmentService = new AppointmentService();
