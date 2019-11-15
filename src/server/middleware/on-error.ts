import { Request, Response, NextFunction } from 'express';
import pino from "pino";
const logger = pino();

/**
 * middleware for error handling
 */
export default function onError(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err.name === "ValidationError") {
    res.status(400);
  } else if (err.name === 'AuthenticationError') {
    res.status(401);
  } else if (err.name === 'NotFoundError') {
    res.status(404);
  } else {
    logger.error(err);
    res.status(500);
  }

  res.send({ error: err.message });
}