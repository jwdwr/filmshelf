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

  public async search(req: Request, res: Response) {
    try {
      const title = req.query.title;
      const year = req.query.year ? Number(req.query.year) : null;
      const page = req.query.page ? Number(req.query.page) : null;

      logger.info({title, year, page});

      const result = await omdbController.search(title, year, page);
      res.send({ result });
    } catch (error) {
      logger.error(error);
      res.send({ error });
    }
  }

  public async getFilmInfo(req: Request, res: Response) {
    try {
      const filmInfo = await omdbController.get(req.params.imdbId);
      res.send({ filmInfo });
    } catch (error) {
      logger.error(error);
      res.send({ error });
    }
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
    this.router.get("/search", this.search);
    this.router.get("/info/:imdbId", this.getFilmInfo);
    this.router.post("/add/:imdbId", this.addFilmFromOMDB);
  }
}

// create router & export routes
const omdbRoutes = new OMDBRouter();
const router = omdbRoutes.router;
export default router;