import { Request, Response } from "express";

import filmController from '../../controllers/film';
import { FilmShelfRouter } from "./router";

/**
 * routes relating to films
 */
export class FilmRouter extends FilmShelfRouter {
  /**
   * add a film to the collection
   */
  public async addFilm(req: Request, res: Response) {
    const filmInfo = req.body;
    const film = await filmController.addFilm(filmInfo);
    res.send({ film });
  }

  /**
   * get a film from the collection
   */
  public async getFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const film = await filmController.getFilm(filmId);
    res.send({ film });
  }

  /**
   * edit a film in the collection
   */
  public async editFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const filmInfo = req.body;
    const film = await filmController.editFilm(filmId, filmInfo);
    res.send({ film });
  }

  /**
   * delete a film from the collection
   */
  public async deleteFilm(req: Request, res: Response) {
    const filmId = req.params.id;
    const deleted = await filmController.deleteFilm(filmId);
    res.send({ deleted });
  }

  /**
   * list the films in the collection
   */
  public async listFilms(req: Request, res: Response) {
    const sortBy = req.query.sortBy;
    const sortDir = req.query.sortDir === 'desc' ? -1 : 1;
    const films = await filmController.listFilms(sortBy, sortDir);
    res.send({ films });
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
