import { Router, Request, Response } from "express";
import pino from "pino";
const logger = pino();

import filmController from '../../controllers/film';
import { FilmShelfRouter } from "../router";

/**
 * routes relating to films
 */
export class FilmRouter extends FilmShelfRouter {
  /**
   * add a film to the collection
   */
  public async addFilm(req: Request, res: Response) {
    try {
      const film = await filmController.addFilm(req.body);
      res.send({film});
    } catch (error) {
      this.onError(error, res);
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
      this.onError(error, res);
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
      this.onError(error, res);
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
      this.onError(error, res);
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
      this.onError(error, res);
    }
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.post("/add", this.addFilm.bind(this));
    this.router.get("/get/:id", this.getFilm.bind(this));
    this.router.put("/edit/:id", this.editFilm.bind(this));
    this.router.delete("/delete/:id", this.deleteFilm.bind(this));
    this.router.get("/list", this.listFilms.bind(this));
  }
}

// create router & export routes
const filmRoutes = new FilmRouter();
const router = filmRoutes.router;
export default router;
