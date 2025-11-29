import { businessRepository } from "../repositories/businessRepository";
import { businessHoursRepository } from "../repositories/businessHoursRepository";

export class BusinessHoursService {

  async getHours(ownerId: string) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    return businessHoursRepository.getHours(business.id);
  }

  async saveHours(ownerId: string, hours: any[]) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    // salva e avança para STEP 4 (team)
    await businessRepository.updateStep(business.id, 4);

    return businessHoursRepository.saveHours(business.id, hours);
  }
}

export const businessHoursService = new BusinessHoursService();
