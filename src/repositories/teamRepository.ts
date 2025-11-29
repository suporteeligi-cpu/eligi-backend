import prisma from "../utils/prisma";
import { addDays } from "date-fns";

export class TeamRepository {

  // 📌 Criar profissional diretamente (sem convite)
  async createMember(data: {
    businessId: string;
    name: string;
    email: string;
    role?: string;
    userId?: string | null;
    permissions: any;
  }) {
    return prisma.businessTeam.create({
      data: {
        businessId: data.businessId,
        name: data.name,
        email: data.email,
        role: data.role || null,
        userId: data.userId || null,

        // PERMISSÕES
        canAccessAgenda: data.permissions.canAccessAgenda,
        canManageServices: data.permissions.canManageServices,
        canViewFinancial: data.permissions.canViewFinancial,
        canIssueNFe: data.permissions.canIssueNFe,
        canManageTeam: data.permissions.canManageTeam,
        canAccessDashboard: data.permissions.canAccessDashboard,
      },
    });
  }

  // 📌 Criar convite
  async createInvite(businessId: string, name: string, email: string, role?: string) {
    const token = crypto.randomUUID();

    return prisma.teamInvite.create({
      data: {
        businessId,
        name,
        email,
        role: role || null,
        inviteToken: token,
        expiresAt: addDays(new Date(), 3), // válido por 72h
      },
    });
  }

  // 📌 Buscar convite pelo token
  async findInviteByToken(token: string) {
    return prisma.teamInvite.findUnique({
      where: { inviteToken: token },
    });
  }

  // 📌 Marcar convite como usado
  async markInviteUsed(token: string) {
    return prisma.teamInvite.update({
      where: { inviteToken: token },
      data: { used: true },
    });
  }

  // 📌 Vincular o usuário criado ao BusinessTeam
  async attachUserToTeamMember(businessId: string, email: string, userId: string) {
    return prisma.businessTeam.updateMany({
      where: { businessId, email },
      data: { userId },
    });
  }

  // 📌 Listar toda a equipe
  async getTeam(businessId: string) {
    return prisma.businessTeam.findMany({
      where: { businessId },
      orderBy: { name: "asc" },
    });
  }

  // 📌 Buscar membro específico
  async getMemberByEmail(businessId: string, email: string) {
    return prisma.businessTeam.findFirst({
      where: { businessId, email },
    });
  }
}

export const teamRepository = new TeamRepository();
