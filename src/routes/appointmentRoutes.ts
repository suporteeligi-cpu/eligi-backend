import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { appointmentController } from "../controllers/appointmentController";

const router = Router();

/**
 * LISTAGEM COM FILTROS + PAGINAÇÃO
 * GET /appointments?search=&status=&date=&professionalId=&page=&limit=
 */
router.get("/", authMiddleware, (req, res, next) =>
  appointmentController.list(req, res, next)
);

/**
 * CRIAR AGENDAMENTO
 */
router.post("/", authMiddleware, (req, res, next) =>
  appointmentController.create(req, res, next)
);

/**
 * ATUALIZAR AGENDAMENTO
 */
router.put("/:id", authMiddleware, (req, res, next) =>
  appointmentController.update(req, res, next)
);

/**
 * DELETAR AGENDAMENTO
 */
router.delete("/:id", authMiddleware, (req, res, next) =>
  appointmentController.delete(req, res, next)
);

export default router;
