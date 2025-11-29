console.log("🔥 ESTE é o businessRoutes.ts REAL sendo carregado!");


import { Router } from "express";
import { businessController } from "../controllers/businessController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

import {
  basicInfoSchema,
  locationSchema,
  finishStepSchema,
  businessTypeSchema, // ✅ ADICIONADO
} from "../dtos/business.dto";

const router = Router();

/**
 * GET /business/me
 * Retorna o negócio do usuário logado
 */
router.get("/me", authMiddleware, (req, res, next) =>
  businessController.getBusiness(req, res, next)
);

/**
 * STEP 0 - Tipo de negócio (segmento)
 */
router.post(
  "/business-type",
  authMiddleware,
  validateRequest(businessTypeSchema),
  (req, res, next) => businessController.businessType(req, res, next)
);

/**
 * STEP 1 - Informações básicas
 */
router.post(
  "/basic-info",
  authMiddleware,
  validateRequest(basicInfoSchema),
  (req, res, next) => businessController.basicInfo(req, res, next)
);

/**
 * STEP 1.5 - Endereço + coordenadas (caso exista)
 */
router.post(
  "/location",
  authMiddleware,
  validateRequest(locationSchema),
  (req, res, next) => businessController.location(req, res, next)
);

/**
 * Finalização do Step 1
 */
router.post(
  "/finish-step-1",
  authMiddleware,
  validateRequest(finishStepSchema),
  (req, res, next) => businessController.finishStep1(req, res, next)
);

/**
 * Endpoint que retorna em qual etapa o usuário está do onboarding
 */
router.get(
  "/onboarding-status",
  authMiddleware,
  (req, res, next) =>
    businessController.getOnboardingStatus(req, res, next)
);

export default router;
