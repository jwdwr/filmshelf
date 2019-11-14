import { Router, Response } from "express";
import pino from "pino";
const logger = pino();

export abstract class FilmShelfRouter {
  router: Router;

  /**
   * construct router & build routes
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * deal with errors in a standardized way
   * @param error the error object
   * @param res express response object
   */
  onError(error: Error, res: Response) {
      logger.error(error);

      if (error.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }

      res.send({ error });
  }

  abstract init(): void;
}