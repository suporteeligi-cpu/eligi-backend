import prisma from "../utils/prisma";

export class BusinessRepository {

  /**
   * STEP 0 — Salva o segmento (tipo do negócio)
   * onboardingStep = 1
   */
  async updateSegment(ownerId: string, segment: string) {
    return prisma.business.upsert({
      where: { ownerId },
      update: {
        segment,
        onboardingStep: 1,
      },
      create: {
        ownerId,
        segment,
        name: "", // será preenchido no Step 1
        onboardingStep: 1,
      }
    });
  }

  /**
   * STEP 1 — Informações básicas do negócio (nome + telefone)
   * onboardingStep = 2
   */
  async updateBasicInfo(ownerId: string, data: {
    name: string;
    phone?: string;
  }) {
    return prisma.business.update({
      where: { ownerId },
      data: {
        name: data.name,
        phone: data.phone || null,
        onboardingStep: 2,
      }
    });
  }

  /**
   * STEP 2 — Localização + coordenadas do negócio
   * onboardingStep = 3
   */
  async updateLocation(ownerId: string, data: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    latitude: number;
    longitude: number;
  }) {
    return prisma.business.update({
      where: { ownerId },
      data: {
        street: data.street,
        number: data.number,
        complement: data.complement ?? null,
        neighborhood: data.neighborhood,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        onboardingStep: 3,
      }
    });
  }

  /**
   * STEP 1 FINAL — reserva para uso futuro
   */
  async finishStep1(ownerId: string) {
    return prisma.business.update({
      where: { ownerId },
      data: { onboardingStep: 3 }
    });
  }

  /**
   * Atualiza o onboarding para qualquer step específico
   * USO:
   * updateStep(businessId, 4) → avança para etapa 4
   */
  async updateStep(businessId: string, step: number) {
    return prisma.business.update({
      where: { id: businessId },
      data: { onboardingStep: step }
    });
  }

  /**
   * Busca o business do usuário logado
   */
  async findByOwner(ownerId: string) {
    return prisma.business.findUnique({
      where: { ownerId },
    });
  }

}

export const businessRepository = new BusinessRepository();
