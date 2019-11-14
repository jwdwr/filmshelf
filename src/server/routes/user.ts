import { Request, Response } from "express";

import userController from '../../controllers/user';
import { FilmShelfRouter } from "./router";

/**
 * routes relating to user functionality
 */
export class UserRouter extends FilmShelfRouter {
  /**
   * create a new user account
   */
  public async signup(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const info = await userController.signup(username, password);
    res.send(info);
  }

  /**
   * validate credentials and return a token
   */
  public async token(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const token = await userController.token(username, password);
    res.send({ token });
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
