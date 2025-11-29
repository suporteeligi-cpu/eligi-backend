import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { teamService } from "../services/teamService";

export class TeamController {

  // 📌 GET /team — listar equipe
  async getTeam(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const team = await teamService.getTeam(ownerId);
      res.json(team);
    } catch (err) {
      next(err);
    }
  }

  // 📌 POST /team — criar membro manualmente
  async createMember(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const member = await teamService.createMember(ownerId, req.body);
      res.status(201).json(member);
    } catch (err) {
      next(err);
    }
  }

  // 📌 POST /team/invite — enviar convite
  async sendInvite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const result = await teamService.sendInvite(ownerId, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // 📌 GET /team/invite/:token — validar convite
  async validateInvite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const invite = await teamService.validateInvite(token);

      res.json({
        name: invite.name,
        email: invite.email,
        role: invite.role,
      });
    } catch (err) {
      next(err);
    }
  }

  // 📌 POST /team/invite/complete — concluir convite
  async completeInvite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      const result = await teamService.completeInvite(token, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const teamController = new TeamController();
