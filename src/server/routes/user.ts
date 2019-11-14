import { Request, Response } from "express";

import userController from '../../controllers/user';
import { FilmShelfRouter } from "../router";

/**
 * routes relating to user functionality
 */
export class UserRouter extends FilmShelfRouter {

  public async signup(req: Request, res: Response) {
    try {
      const info = await userController.signup(req.body.username, req.body.password);
      res.send(info);
    } catch (error) {
      this.onError(error, res);
    }
  }

  public async token(req: Request, res: Response) {
    try {
      const token = await userController.token(req.body.username, req.body.password);
      res.send({token});
    } catch (error) {
      this.onError(error, res);
    }
  }

  /**
   * add handlers to routes
   */
  init() {
    this.router.post("/signup", this.signup.bind(this));
    this.router.post("/token", this.token.bind(this));
  }
}

// create router & export routes
const userRoutes = new UserRouter();
const router = userRoutes.router;
export default router;
