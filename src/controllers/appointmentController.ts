import { appointmentService } from "../services/appointmentService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Response, NextFunction } from "express";

export class AppointmentController {

  /**
   * Criar agendamento
   */
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const data = req.body;

      const result = await appointmentService.create(ownerId, data);
      return res.status(201).json(result);

    } catch (err) {
      next(err);
    }
  }

  /**
   * Listar com filtros + paginação
   */
  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;

      // Filtros via query string
      const search = req.query.search?.toString();
      const status = req.query.status?.toString();
      const date = req.query.date?.toString();
      const professionalId = req.query.professionalId?.toString();

      // Paginação
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await appointmentService.listFiltered(ownerId, {
        search,
        status,
        date,
        professionalId,
        page,
        limit,
      });

      return res.json(result);

    } catch (err) {
      next(err);
    }
  }

  /**
   * Atualizar
   */
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const { id } = req.params;

      const result = await appointmentService.update(ownerId, id, req.body);
      return res.json(result);

    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletar
   */
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const { id } = req.params;

      await appointmentService.delete(ownerId, id);
      return res.json({ success: true });

    } catch (err) {
      next(err);
    }
  }
}

export const appointmentController = new AppointmentController();
