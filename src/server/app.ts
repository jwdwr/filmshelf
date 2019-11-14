import express from 'express';
import pino from 'express-pino-logger';
import bodyParser from 'body-parser';
import 'express-async-errors';

import filmRouter from "./routes/film";
import omdbRouter from "./routes/omdb";
import userRouter from './routes/user';
import auth from './middleware/auth';
import onError from './middleware/on-error';

// express app
class App {
  public express: express.Application;

  // create express app
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.error();
  }

  // add middleware
  private middleware(): void {
    this.express.use(pino());
    this.express.use(bodyParser.json());
  }

  // add endpoints
  private routes(): void {
    this.express.get('/', (req, res) => res.send(true));
    this.express.use("/film", auth, filmRouter);
    this.express.use("/omdb", auth, omdbRouter);
    this.express.use("/user", userRouter);
  }

  private error(): void {
    this.express.use(onError);
  }
}

export default new App().express;
