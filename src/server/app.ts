import express from 'express';
import pino from 'express-pino-logger';

import filmRouter from "./routes/film";

// express app
class App {
  public express: express.Application;

  // create express app
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // add middleware
  private middleware(): void {
    this.express.use(pino());
  }

  // add endpoints
  private routes(): void {
    this.express.get('/', (req, res) => res.send(true));
    this.express.use("/film", filmRouter);
  }
}

export default new App().express;
