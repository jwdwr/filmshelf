import { Router, Request, Response } from "express";
import pino from "pino";
const logger = pino();

import filmController from '../../controllers/film';

/**
 * routes relating to films
 */
export class FilmRouter {
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
  public async addFilm(req: Request, res: Response) {
    try {
      const film = await filmController.addFilm(req.body);
      res.send({film});
    } catch (error) {
      logger.error(error);
      res.send({error});
    }
  }

  /**
   * get a film from the collection
   */
  public async getFilm(req: Request, res: Response) {
    try {
      const film = await filmController.getFilm(req.params.id);
      res.send({film});
    } catch (error) {
      logger.error({error})
      res.send({error});
    }
  }

  /**
   * edit a film in the collection
   */
  public async editFilm(req: Request, res: Response) {
    try {
      const film = await filmController.editFilm(req.params.id, req.body);
      res.send({film});
    } catch (error) {
      logger.error({error});
      res.send({error});
    }
  }

  /**
   * delete a film from the collection
   */
  public async deleteFilm(req: Request, res: Response) {
    try {
      const deleted = await filmController.deleteFilm(req.params.id);
      res.send({deleted});
    } catch (error) {
      logger.error({error});
      res.send({error});
    }
  }

  /**
   * list the films in the collection
   */
  public async listFilms(req: Request, res: Response) {
    try {
      const films = await filmController.listFilms();
      res.send({films});
    } catch (error) {
      logger.error({error});
      res.send({error});
    }
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.post("/add", this.addFilm);
    this.router.get("/get/:id", this.getFilm);
    this.router.put("/edit/:id", this.editFilm);
    this.router.delete("/delete/:id", this.deleteFilm);
    this.router.get("/list", this.listFilms);
  }
}

// create router & export routes
const filmRoutes = new FilmRouter();
const router = filmRoutes.router;
export default router;
