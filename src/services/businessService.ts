import { businessRepository } from "../repositories/businessRepository";

export class BusinessService {

  /**
   * STEP 0 — Tipo de negócio (segmento)
   */
  async saveBusinessType(ownerId: string, segment: string) {
    return businessRepository.updateSegment(ownerId, segment);
  }

  /**
   * STEP 1 — Informações básicas (Nome + Telefone)
   */
  async saveBasicInfo(ownerId: string, data: {
    businessName: string;
    phone?: string;
  }) {
    return businessRepository.updateBasicInfo(ownerId, {
      name: data.businessName,
      phone: data.phone,
    });
  }

  /**
   * STEP 2 — Localização completa + coordenadas
   */
  async setLocation(ownerId: string, data: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    latitude: number;
    longitude: number;
  }) {
    return businessRepository.updateLocation(ownerId, {
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.district,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }

  /**
   * Step auxiliar (caso necessário)
   */
  async finishStep1(ownerId: string) {
    return businessRepository.finishStep1(ownerId);
  }

  /**
   * Busca o negócio atual do usuário logado
   */
  async getMyBusiness(ownerId: string) {
    return businessRepository.findByOwner(ownerId);
  }
}

export const businessService = new BusinessService();
