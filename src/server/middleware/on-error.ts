import { Request, Response, NextFunction } from 'express';
import pino from "pino";
const logger = pino();

/**
 * middleware for error handling
 */
export default function onError(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err);

  if (err.name === "ValidationError") {
    res.status(400);
  } else {
    res.status(500);
  }

  res.send({ error: err.message });
}