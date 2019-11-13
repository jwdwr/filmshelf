import express from 'express';
import pino from 'express-pino-logger';
import bodyParser from 'body-parser';

import filmRouter from "./routes/film";
import omdbRouter from "./routes/omdb";

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
    this.express.use(bodyParser.json());
  }

  // add endpoints
  private routes(): void {
    this.express.get('/', (req, res) => res.send(true));
    this.express.use("/film", filmRouter);
    this.express.use("/omdb", omdbRouter);
  }
}

export default new App().express;
