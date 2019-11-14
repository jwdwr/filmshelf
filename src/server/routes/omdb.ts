import { Request, Response } from "express";

import omdbController from '../../controllers/omdb';
import { FilmShelfRouter } from "../router";

/**
 * routes relating to OMDB functionality
 */
export class OMDBRouter extends FilmShelfRouter {
  /**
   * search for an IMDB film
   */
  public async search(req: Request, res: Response) {
    try {
      const title = req.query.title;
      const year = req.query.year ? Number(req.query.year) : null;
      const page = req.query.page ? Number(req.query.page) : null;

      const result = await omdbController.search(title, year, page);
      res.send({ result });
    } catch (error) {
      this.onError(error, res);
    }
  }

  /**
   * get info about an IMDB film
   */
  public async getFilmInfo(req: Request, res: Response) {
    try {
      const filmInfo = await omdbController.get(req.params.imdbId);
      res.send({ filmInfo });
    } catch (error) {
      this.onError(error, res);
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
      this.onError(error, res);
    }
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.get("/search", this.search.bind(this));
    this.router.get("/info/:imdbId", this.getFilmInfo.bind(this));
    this.router.post("/add/:imdbId", this.addFilmFromOMDB.bind(this));
  }
}

// create router & export routes
const omdbRoutes = new OMDBRouter();
const router = omdbRoutes.router;
export default router;
