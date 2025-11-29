import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  logger.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  return res.status(status).json({
    success: false,
    message
  });
}
