import { Router } from "express";
import { teamController } from "../controllers/teamController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// 📌 Listar equipe
router.get(
  "/",
  authMiddleware,
  (req, res, next) => teamController.getTeam(req, res, next)
);

// 📌 Criar membro manualmente (sem convite)
router.post(
  "/",
  authMiddleware,
  (req, res, next) => teamController.createMember(req, res, next)
);

// 📌 Enviar convite
router.post(
  "/invite",
  authMiddleware,
  (req, res, next) => teamController.sendInvite(req, res, next)
);

// 📌 Validar token de convite
router.get(
  "/invite/:token",
  (req, res, next) => teamController.validateInvite(req, res, next)
);

// 📌 Completar convite (criar conta)
router.post(
  "/invite/complete",
  (req, res, next) => teamController.completeInvite(req, res, next)
);

export default router;
