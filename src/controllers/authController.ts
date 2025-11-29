import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register({ email, password, name });

      return res.status(201).json({
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });

      return res.status(200).json({
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);

      return res.status(200).json({ message: 'Logged out' });
    } catch (err) {
      next(err);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential } = req.body;

      if (!credential) {
        return res.status(400).json({ message: "Google credential is required" });
      }

      const result = await authService.googleAuth(credential);

      return res.status(200).json({
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          avatar: result.user.avatar
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });

    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
