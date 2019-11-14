import { Router } from "express";

export abstract class FilmShelfRouter {
  router: Router;

  /**
   * construct router & build routes
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  abstract init(): void;
}