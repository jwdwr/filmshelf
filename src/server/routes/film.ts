import { Router, Request, Response } from "express";

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
    const film = await filmController.addFilm(req.body);
    res.send(film);
  }

  /**
   * get a film from the collection
   */
  public async getFilm(req: Request, res: Response) {
    const film = await filmController.getFilm(req.params.id);
    res.send(film);
  }

  /**
   * edit a film in the collection
   */
  public async editFilm(req: Request, res: Response) {
    const film = await filmController.editFilm(req.params.id, req.body);
    res.send(film)
  }

  /**
   * delete a film from the collection
   */
  public async deleteFilm(req: Request, res: Response) {
    const deleted = await filmController.deleteFilm(req.params.id);
    res.send(deleted);
  }

  /**
   * list the films in the collection
   */
  public async listFilms(req: Request, res: Response) {
    const films = await filmController.listFilms();
    res.send(films);
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
