import { Router, Request, Response } from "express";
import pino from "pino";
const logger = pino();

import omdbController from '../../controllers/omdb';

/**
 * routes relating to OMDB functionality
 */
export class OMDBRouter {
  router: Router;

  /**
   * construct router & build routes
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * add a film to the collection
   */
  public async addFilmFromOMDB(req: Request, res: Response) {
    try {
      const film = await omdbController.addFilmFromOMDB(req.params.imdbId);
      res.send({film});
    } catch (error) {
      logger.error(error);
      res.send({error});
    }
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.post("/add/:imdbId", this.addFilmFromOMDB);
  }
}

// create router & export routes
const omdbRoutes = new OMDBRouter();
const router = omdbRoutes.router;
export default router;
