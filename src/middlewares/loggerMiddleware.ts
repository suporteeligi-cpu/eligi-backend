import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  logger.info({ method: req.method, url: req.url });
  next();
}
