import { teamRepository } from "../repositories/teamRepository";
import { businessRepository } from "../repositories/businessRepository";
import { userRepository } from "../repositories/userRepository";
import { hashPassword } from "../utils/hash";
import { mailer } from "../utils/mailer";

export class TeamService {

  // 📌 SALVAR MEMBRO DIRETO (sem convite)
  async createMember(ownerId: string, data: any) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    // Check se já existe membro com este e-mail
    const existing = await teamRepository.getMemberByEmail(business.id, data.email);
    if (existing) throw new Error("Já existe um membro com este e-mail.");

    // Criação com permissões
    const permissions = {
      canAccessAgenda: !!data.canAccessAgenda,
      canManageServices: !!data.canManageServices,
      canViewFinancial: !!data.canViewFinancial,
      canIssueNFe: !!data.canIssueNFe,
      canManageTeam: !!data.canManageTeam,
      canAccessDashboard: !!data.canAccessDashboard,
    };

    const member = await teamRepository.createMember({
      businessId: business.id,
      name: data.name,
      email: data.email,
      role: data.role,
      userId: null,
      permissions,
    });

    // Primeiro membro avança o onboarding
    if (business.onboardingStep < 5) {
      await businessRepository.updateStep(business.id, 5);
    }

    return member;
  }

  // 📌 ENVIAR CONVITE POR E-MAIL
  async sendInvite(ownerId: string, data: { name: string; email: string; role?: string }) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    // Impedir convite duplicado
    const existing = await teamRepository.getMemberByEmail(business.id, data.email);
    if (existing) throw new Error("Já existe um membro com este e-mail.");

    const invite = await teamRepository.createInvite(
      business.id,
      data.name,
      data.email,
      data.role
    );

    // Envia e-mail com o link
    await mailer.sendInviteEmail(data.email, data.name, invite.inviteToken);

    return { message: "Convite enviado com sucesso!" };
  }

  // 📌 VALIDAR TOKEN DO CONVITE
  async validateInvite(token: string) {
    const invite = await teamRepository.findInviteByToken(token);

    if (!invite) throw new Error("Convite inválido.");
    if (invite.used) throw new Error("Este convite já foi utilizado.");
    if (invite.expiresAt < new Date()) throw new Error("Este convite expirou.");

    return invite;
  }

  // 📌 COMPLETAR CONVITE (CRIAR USUÁRIO + VINCULAR A EQUIPE)
  async completeInvite(token: string, password: string) {
    const invite = await this.validateInvite(token);

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      email: invite.email,
      name: invite.name,
      passwordHash,
    });

    // Vincula usuário ao membro da equipe
    await teamRepository.attachUserToTeamMember(invite.businessId, invite.email, user.id);

    // Marca convite como usado
    await teamRepository.markInviteUsed(token);

    return { message: "Conta criada com sucesso! Você já pode fazer login." };
  }

  // 📌 OBTER TODOS OS MEMBROS
  async getTeam(ownerId: string) {
    const business = await businessRepository.findByOwner(ownerId);
    if (!business) throw new Error("Business not found");

    return teamRepository.getTeam(business.id);
  }
}

export const teamService = new TeamService();
