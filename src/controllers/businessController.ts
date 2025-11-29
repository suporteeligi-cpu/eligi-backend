import { Response, NextFunction } from "express";
import { businessService } from "../services/businessService";
import { AuthRequest } from "../middlewares/authMiddleware";

export class BusinessController {

  // ------------------------------------------------------------
  // STEP 1 — Informações básicas (Nome + Telefone)
  // ------------------------------------------------------------
  async basicInfo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const { businessName, phone } = req.body;

      const business = await businessService.saveBasicInfo(ownerId, {
        businessName,
        phone,
      });

      res.status(201).json(business);
    } catch (err) {
      next(err);
    }
  }

  // ------------------------------------------------------------
  // STEP 2 — Localização completa (Rua, número, bairro, etc.)
  // ------------------------------------------------------------
  async location(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;

      const business = await businessService.setLocation(ownerId, req.body);

      res.status(200).json(business);
    } catch (err) {
      next(err);
    }
  }

  // ------------------------------------------------------------
  // (AUXILIAR) — Antigo finish-step-1. Mantido só por compatibilidade.
  // ------------------------------------------------------------
  async finishStep1(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;

      const business = await businessService.finishStep1(ownerId);

      res.status(200).json(business);
    } catch (err) {
      next(err);
    }
  }

  // ------------------------------------------------------------
  // GET — Retorna o negócio do usuário logado
  // Usado pelo checkOnboardingProgress()
  // ------------------------------------------------------------
  async getBusiness(req: AuthRequest, res: Response) {
    const ownerId = req.user!.id;
    const business = await businessService.getMyBusiness(ownerId);
    return res.json(business);
  }

  // ------------------------------------------------------------
  // STEP 0 — Tipo do negócio (segmento)
  // ------------------------------------------------------------
  async businessType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user!.id;
      const { segment } = req.body;

      const result = await businessService.saveBusinessType(ownerId, segment);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  // ------------------------------------------------------------
  // CHECK DE ONBOARDING — usado no front para redirecionar automaticamente
  // ------------------------------------------------------------
  async getOnboardingStatus(req: AuthRequest, res: Response) {
    const ownerId = req.user!.id;

    const business = await businessService.getMyBusiness(ownerId);

    res.json({
      onboardingStep: business?.onboardingStep ?? 0,
    });
  }
}

export const businessController = new BusinessController();
