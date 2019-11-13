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
  public getFilm(req: Request, res: Response) {
    res.send(false);
  }

  /**
   * edit a film in the collection
   */
  public editFilm(req: Request, res: Response) {
    res.send(false)
  }

  /**
   * delete a film from the collection
   */
  public deleteFilm(req: Request, res: Response) {
    res.send(false);
  }

  /**
   * list the films in the collection
   */
  public listFilms(req: Request, res: Response) {
    res.send(false);
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
