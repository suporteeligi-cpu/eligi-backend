import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema, refreshSchema } from '../dtos/auth.dto';
import { authRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/register', validateRequest(registerSchema), (req, res, next) =>
  authController.register(req, res, next)
);

router.post('/login', authRateLimiter, validateRequest(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);

router.post('/refresh', validateRequest(refreshSchema), (req, res, next) =>
  authController.refresh(req, res, next)
);

router.post('/logout', validateRequest(refreshSchema), (req, res, next) =>
  authController.logout(req, res, next)
);

// ✅🔥 NOVO — Google Auth
router.post('/google', (req, res, next) =>
  authController.googleAuth(req, res, next)
);

export default router;
