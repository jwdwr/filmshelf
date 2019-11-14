import { Request, Response } from "express";

import omdbController from '../../controllers/omdb';
import { FilmShelfRouter } from "./router";

/**
 * routes relating to OMDB functionality
 */
export class OMDBRouter extends FilmShelfRouter {
  /**
   * search for an IMDB film
   */
  public async search(req: Request, res: Response) {
    const title = req.query.title;
    const year = req.query.year ? Number(req.query.year) : null;
    const page = req.query.page ? Number(req.query.page) : null;

    const result = await omdbController.search(title, year, page);
    res.send({ result });
  }

  /**
   * get info about an IMDB film
   */
  public async getFilmInfo(req: Request, res: Response) {
    const imdbId = req.params.imdbId;
    const filmInfo = await omdbController.get(imdbId);
    res.send({ filmInfo });
  }

  /**
   * add a film to the collection
   */
  public async addFilmFromOMDB(req: Request, res: Response) {
    const imdbId = req.params.imdbId;
    const film = await omdbController.addFilmFromOMDB(imdbId);
    res.send({ film });
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
